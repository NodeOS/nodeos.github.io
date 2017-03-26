#!/usr/bin/env node
const fs = require('fs-extra')

const _ = require('lodash')
const async = require('async')
const GitHub = require('github')
const git = require('simple-git')
const date_format = require('dateformat');


const GITHUB_TOKEN = process.env.GITHUB_TOKEN // API Token
const POST_DIR = './_posts'
const TEMPLATE_PATH = './templates/post.md'


var github = new GitHub({
  debug: false
})

async.waterfall([
  function authenticate(callback)
  {
    console.log('Authenticating with GitHub...')

    github.authenticate({
        type: "token",
        token: GITHUB_TOKEN
    })
    callback()
  },

  function clear_past_posts(callback) {
    console.log('Clearing previous posts...')
    fs.removeSync(POST_DIR)
    fs.mkdirSync(POST_DIR)
    callback()
  },

  function grab_posts(callback)
  {
    console.log('Grabbing posts...')

    var posts = []

    function process_results(error, results) {
      if (error)
      {
        callback(error)
      }

      Object.assign(posts, results)

      if (github.hasNextPage(results))
      {
        github.getNextPage(results, process_results)
      } else {
        callback(null, posts)
      }
    }

    github.issues.getForRepo({
      owner: "NodeOS",
      repo: "NodeOS",
      state: "all",
      labels: "blog",
      per_page: 100
    }, process_results)
  },

  function write_posts(posts, callback)
  {
    console.log('Writing posts...')

    fs.readFile(TEMPLATE_PATH, 'utf8', function(error, post_template)
    {
      if (error)
      {
        callback(error)
      }

      var template = _.template(post_template)

      _.forEach(posts, function(post)
      {

        var data = template(post)
        var date = date_format(post.created_at, 'yyyy-mm-dd')

        // Writes posts to 'posts/(date)-(id).md'
        var write_stream = fs.createWriteStream(POST_DIR+'/'+date+'-'+post.title+'.md')
        write_stream.write(data);
        write_stream.end()
      })

      callback()
    })
  }
], function(error)
{
  if (error)
  {
    console.error(error)
    process.exit(1)
  }
})
