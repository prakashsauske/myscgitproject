


<!DOCTYPE html>
<html>
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# githubog: http://ogp.me/ns/fb/githubog#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>jQuery-UI-Date-Range-Picker/js/daterangepicker.jQuery.compressed.js at master · filamentgroup/jQuery-UI-Date-Range-Picker · GitHub</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub" />
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub" />
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-144.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144.png" />
    <link rel="logo" type="image/svg" href="https://github-media-downloads.s3.amazonaws.com/github-logo.svg" />
    <meta property="og:image" content="https://a248.e.akamai.net/assets.github.com/images/modules/logos_page/Octocat.png">
    <meta name="hostname" content="fe2.rs.github.com">
    <link rel="assets" href="https://a248.e.akamai.net/assets.github.com/">
    <link rel="xhr-socket" href="/_sockets" />
    
    


    <meta name="msapplication-TileImage" content="/windows-tile.png" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="selected-link" value="repo_source" data-pjax-transient />
    <meta content="collector.githubapp.com" name="octolytics-host" /><meta content="github" name="octolytics-app-id" />

    
    
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />

    <meta content="authenticity_token" name="csrf-param" />
<meta content="EuSy20ugE0nCN9s/4bArV8EHVD0ZHLNNCmLeuQH5ddc=" name="csrf-token" />

    <link href="https://a248.e.akamai.net/assets.github.com/assets/github-9663736cbd9ab3c9efc4c2d9cf152288cfa7b1e2.css" media="all" rel="stylesheet" type="text/css" />
    <link href="https://a248.e.akamai.net/assets.github.com/assets/github2-13a1767e53653178a55a8f1aa8fc7567598b5369.css" media="all" rel="stylesheet" type="text/css" />
    


      <script src="https://a248.e.akamai.net/assets.github.com/assets/frameworks-e8054ad804a1cf9e9849130fee5a4a5487b663ed.js" type="text/javascript"></script>
      <script src="https://a248.e.akamai.net/assets.github.com/assets/github-6db070a7fd82c30d0b0bf14595d2913f6fa7886c.js" type="text/javascript"></script>
      
      <meta http-equiv="x-pjax-version" content="cd1237141e3e4bbcf601d22d4bff759f">

        <link data-pjax-transient rel='permalink' href='/filamentgroup/jQuery-UI-Date-Range-Picker/blob/add94255e13312f09c43e00e6ff91d61808e984a/js/daterangepicker.jQuery.compressed.js'>
  <meta property="og:title" content="jQuery-UI-Date-Range-Picker"/>
  <meta property="og:type" content="githubog:gitrepository"/>
  <meta property="og:url" content="https://github.com/filamentgroup/jQuery-UI-Date-Range-Picker"/>
  <meta property="og:image" content="https://a248.e.akamai.net/assets.github.com/images/gravatars/gravatar-user-420.png"/>
  <meta property="og:site_name" content="GitHub"/>
  <meta property="og:description" content="jQuery-UI-Date-Range-Picker - A range picker built on top of jQuery UI&#39;s Datepicker Control"/>

  <meta name="description" content="jQuery-UI-Date-Range-Picker - A range picker built on top of jQuery UI&#39;s Datepicker Control" />

  <meta content="30614" name="octolytics-dimension-user_id" /><meta content="filamentgroup" name="octolytics-dimension-user_login" /><meta content="1171338" name="octolytics-dimension-repository_id" /><meta content="filamentgroup/jQuery-UI-Date-Range-Picker" name="octolytics-dimension-repository_nwo" /><meta content="true" name="octolytics-dimension-repository_public" /><meta content="false" name="octolytics-dimension-repository_is_fork" /><meta content="1171338" name="octolytics-dimension-repository_network_root_id" /><meta content="filamentgroup/jQuery-UI-Date-Range-Picker" name="octolytics-dimension-repository_network_root_nwo" />
  <link href="https://github.com/filamentgroup/jQuery-UI-Date-Range-Picker/commits/master.atom" rel="alternate" title="Recent Commits to jQuery-UI-Date-Range-Picker:master" type="application/atom+xml" />

  </head>


  <body class="logged_out page-blob windows vis-public env-production ">

    <div class="wrapper">
      
      
      


      
      <div class="header header-logged-out">
  <div class="container clearfix">

    <a class="header-logo-wordmark" href="https://github.com/">
      <span class="mega-octicon octicon-logo-github"></span>
    </a>

    <div class="header-actions">
      <a class="button primary" href="/signup">Sign up</a>
      <a class="button" href="/login?return_to=%2Ffilamentgroup%2FjQuery-UI-Date-Range-Picker%2Fblob%2Fmaster%2Fjs%2Fdaterangepicker.jQuery.compressed.js">Sign in</a>
    </div>

    <div class="command-bar js-command-bar  in-repository">


      <ul class="top-nav">
          <li class="explore"><a href="/explore">Explore</a></li>
        <li class="features"><a href="/features">Features</a></li>
          <li class="enterprise"><a href="https://enterprise.github.com/">Enterprise</a></li>
          <li class="blog"><a href="/blog">Blog</a></li>
      </ul>
        <form accept-charset="UTF-8" action="/search" class="command-bar-form" id="top_search_form" method="get">

<input type="text" data-hotkey=" s" name="q" id="js-command-bar-field" placeholder="Search or type a command" tabindex="1" autocapitalize="off"
    
    
      data-repo="filamentgroup/jQuery-UI-Date-Range-Picker"
      data-branch="master"
      data-sha="71cfa2db6c8740c9a7aafb7428929d321d95b44f"
  >

    <input type="hidden" name="nwo" value="filamentgroup/jQuery-UI-Date-Range-Picker" />

    <div class="select-menu js-menu-container js-select-menu search-context-select-menu">
      <span class="minibutton select-menu-button js-menu-target">
        <span class="js-select-button">This repository</span>
      </span>

      <div class="select-menu-modal-holder js-menu-content js-navigation-container">
        <div class="select-menu-modal">

          <div class="select-menu-item js-navigation-item js-this-repository-navigation-item selected">
            <span class="select-menu-item-icon octicon octicon-check"></span>
            <input type="radio" class="js-search-this-repository" name="search_target" value="repository" checked="checked" />
            <div class="select-menu-item-text js-select-button-text">This repository</div>
          </div> <!-- /.select-menu-item -->

          <div class="select-menu-item js-navigation-item js-all-repositories-navigation-item">
            <span class="select-menu-item-icon octicon octicon-check"></span>
            <input type="radio" name="search_target" value="global" />
            <div class="select-menu-item-text js-select-button-text">All repositories</div>
          </div> <!-- /.select-menu-item -->

        </div>
      </div>
    </div>

  <span class="octicon help tooltipped downwards" title="Show command bar help">
    <span class="octicon octicon-question"></span>
  </span>


  <input type="hidden" name="ref" value="cmdform">

</form>
    </div>

  </div>
</div>


      


          <div class="site" itemscope itemtype="http://schema.org/WebPage">
    
    <div class="pagehead repohead instapaper_ignore readability-menu">
      <div class="container">
        

<ul class="pagehead-actions">


    <li>
      <a href="/login?return_to=%2Ffilamentgroup%2FjQuery-UI-Date-Range-Picker"
        class="minibutton with-count js-toggler-target star-button entice tooltipped upwards"
        title="You must be signed in to use this feature" rel="nofollow">
        <span class="octicon octicon-star"></span>Star
      </a>
      <a class="social-count js-social-count" href="/filamentgroup/jQuery-UI-Date-Range-Picker/stargazers">
        279
      </a>
    </li>
    <li>
      <a href="/login?return_to=%2Ffilamentgroup%2FjQuery-UI-Date-Range-Picker"
        class="minibutton with-count js-toggler-target fork-button entice tooltipped upwards"
        title="You must be signed in to fork a repository" rel="nofollow">
        <span class="octicon octicon-git-branch"></span>Fork
      </a>
      <a href="/filamentgroup/jQuery-UI-Date-Range-Picker/network" class="social-count">
        93
      </a>
    </li>
</ul>

        <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title public">
          <span class="repo-label"><span>public</span></span>
          <span class="mega-octicon octicon-repo"></span>
          <span class="author">
            <a href="/filamentgroup" class="url fn" itemprop="url" rel="author"><span itemprop="title">filamentgroup</span></a></span
          ><span class="repohead-name-divider">/</span><strong
          ><a href="/filamentgroup/jQuery-UI-Date-Range-Picker" class="js-current-repository js-repo-home-link">jQuery-UI-Date-Range-Picker</a></strong>

          <span class="page-context-loader">
            <img alt="Octocat-spinner-32" height="16" src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
          </span>

        </h1>
      </div><!-- /.container -->
    </div><!-- /.repohead -->

    <div class="container">

      <div class="repository-with-sidebar repo-container
            ">

          <div class="repository-sidebar">

              

<div class="repo-nav repo-nav-full js-repository-container-pjax js-octicon-loaders">
  <div class="repo-nav-contents">
    <ul class="repo-menu">
      <li class="tooltipped leftwards" title="Code">
        <a href="/filamentgroup/jQuery-UI-Date-Range-Picker" class="js-selected-navigation-item selected" data-gotokey="c" data-pjax="true" data-selected-links="repo_source repo_downloads repo_commits repo_tags repo_branches /filamentgroup/jQuery-UI-Date-Range-Picker">
          <span class="octicon octicon-code"></span> <span class="full-word">Code</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

        <li class="tooltipped leftwards" title="Issues">
          <a href="/filamentgroup/jQuery-UI-Date-Range-Picker/issues" class="js-selected-navigation-item js-disable-pjax" data-gotokey="i" data-selected-links="repo_issues /filamentgroup/jQuery-UI-Date-Range-Picker/issues">
            <span class="octicon octicon-issue-opened"></span> <span class="full-word">Issues</span>
            <span class='counter'>14</span>
            <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>        </li>

      <li class="tooltipped leftwards" title="Pull Requests"><a href="/filamentgroup/jQuery-UI-Date-Range-Picker/pulls" class="js-selected-navigation-item js-disable-pjax" data-gotokey="p" data-selected-links="repo_pulls /filamentgroup/jQuery-UI-Date-Range-Picker/pulls">
            <span class="octicon octicon-git-pull-request"></span> <span class="full-word">Pull Requests</span>
            <span class='counter'>6</span>
            <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>




    </ul>
    <div class="repo-menu-separator"></div>
    <ul class="repo-menu">

      <li class="tooltipped leftwards" title="Pulse">
        <a href="/filamentgroup/jQuery-UI-Date-Range-Picker/pulse" class="js-selected-navigation-item " data-pjax="true" data-selected-links="pulse /filamentgroup/jQuery-UI-Date-Range-Picker/pulse">
          <span class="octicon octicon-pulse"></span> <span class="full-word">Pulse</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

      <li class="tooltipped leftwards" title="Graphs">
        <a href="/filamentgroup/jQuery-UI-Date-Range-Picker/graphs" class="js-selected-navigation-item " data-pjax="true" data-selected-links="repo_graphs repo_contributors /filamentgroup/jQuery-UI-Date-Range-Picker/graphs">
          <span class="octicon octicon-graph"></span> <span class="full-word">Graphs</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

      <li class="tooltipped leftwards" title="Network">
        <a href="/filamentgroup/jQuery-UI-Date-Range-Picker/network" class="js-selected-navigation-item js-disable-pjax" data-selected-links="repo_network /filamentgroup/jQuery-UI-Date-Range-Picker/network">
          <span class="octicon octicon-git-branch"></span> <span class="full-word">Network</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

    </ul>

  </div>
</div>


              <div class="only-with-full-nav">

                

  

<div class="clone-url open"
  data-protocol-type="http"
  data-url="/users/set_protocol?protocol_selector=http&amp;protocol_type=clone">
  <h3><strong>HTTPS</strong> clone URL</h3>

  <input type="text" class="clone js-url-field"
         value="https://github.com/filamentgroup/jQuery-UI-Date-Range-Picker.git" readonly="readonly">

  <span class="js-zeroclipboard url-box-clippy minibutton zeroclipboard-button" data-clipboard-text="https://github.com/filamentgroup/jQuery-UI-Date-Range-Picker.git" data-copied-hint="copied!" title="copy to clipboard"><span class="octicon octicon-clippy"></span></span>
</div>

  

<div class="clone-url "
  data-protocol-type="subversion"
  data-url="/users/set_protocol?protocol_selector=subversion&amp;protocol_type=clone">
  <h3><strong>Subversion</strong> checkout URL</h3>

  <input type="text" class="clone js-url-field"
         value="https://github.com/filamentgroup/jQuery-UI-Date-Range-Picker" readonly="readonly">

  <span class="js-zeroclipboard url-box-clippy minibutton zeroclipboard-button" data-clipboard-text="https://github.com/filamentgroup/jQuery-UI-Date-Range-Picker" data-copied-hint="copied!" title="copy to clipboard"><span class="octicon octicon-clippy"></span></span>
</div>



<p class="clone-options">You can clone with
    <a href="#" class="js-clone-selector" data-protocol="http">HTTPS</a>,
    <a href="#" class="js-clone-selector" data-protocol="subversion">Subversion</a>,
  and <a href="https://help.github.com/articles/which-remote-url-should-i-use">other methods.</a>
</p>


  <a href="http://windows.github.com" class="minibutton sidebar-button">
    <span class="octicon octicon-device-desktop"></span>
    Clone in Desktop
  </a>


                  <a href="/filamentgroup/jQuery-UI-Date-Range-Picker/archive/master.zip"
                     class="minibutton sidebar-button"
                     title="Download this repository as a zip file"
                     rel="nofollow">
                    <span class="octicon octicon-cloud-download"></span>
                    Download ZIP
                  </a>

              </div>
          </div>

          <div id="js-repo-pjax-container" class="repository-content context-loader-container" data-pjax-container>
            


<!-- blob contrib key: blob_contributors:v21:aa4007186dfb05c3c00952ac4fc2b997 -->
<!-- blob contrib frag key: views10/v8/blob_contributors:v21:aa4007186dfb05c3c00952ac4fc2b997 -->

<p title="This is a placeholder element" class="js-history-link-replace hidden"></p>

<a href="/filamentgroup/jQuery-UI-Date-Range-Picker/find/master" data-pjax data-hotkey="t" style="display:none">Show File Finder</a>

<div class="file-navigation">
  


<div class="select-menu js-menu-container js-select-menu" >
  <span class="minibutton select-menu-button js-menu-target" data-hotkey="w"
    data-master-branch="master"
    data-ref="master">
    <span class="octicon octicon-git-branch"></span>
    <i>branch:</i>
    <span class="js-select-button">master</span>
  </span>

  <div class="select-menu-modal-holder js-menu-content js-navigation-container" data-pjax>

    <div class="select-menu-modal">
      <div class="select-menu-header">
        <span class="select-menu-title">Switch branches/tags</span>
        <span class="octicon octicon-remove-close js-menu-close"></span>
      </div> <!-- /.select-menu-header -->

      <div class="select-menu-filters">
        <div class="select-menu-text-filter">
          <input type="text" id="context-commitish-filter-field" class="js-filterable-field js-navigation-enable" placeholder="Filter branches/tags">
        </div>
        <div class="select-menu-tabs">
          <ul>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="branches" class="js-select-menu-tab">Branches</a>
            </li>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="tags" class="js-select-menu-tab">Tags</a>
            </li>
          </ul>
        </div><!-- /.select-menu-tabs -->
      </div><!-- /.select-menu-filters -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="branches">

        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item selected">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/filamentgroup/jQuery-UI-Date-Range-Picker/blob/master/js/daterangepicker.jQuery.compressed.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="master" rel="nofollow" title="master">master</a>
            </div> <!-- /.select-menu-item -->
        </div>

          <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="tags">
        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


        </div>

        <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

    </div> <!-- /.select-menu-modal -->
  </div> <!-- /.select-menu-modal-holder -->
</div> <!-- /.select-menu -->

  <div class="breadcrumb">
    <span class='repo-root js-repo-root'><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/filamentgroup/jQuery-UI-Date-Range-Picker" data-branch="master" data-direction="back" data-pjax="true" itemscope="url"><span itemprop="title">jQuery-UI-Date-Range-Picker</span></a></span></span><span class="separator"> / </span><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/filamentgroup/jQuery-UI-Date-Range-Picker/tree/master/js" data-branch="master" data-direction="back" data-pjax="true" itemscope="url"><span itemprop="title">js</span></a></span><span class="separator"> / </span><strong class="final-path">daterangepicker.jQuery.compressed.js</strong> <span class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="js/daterangepicker.jQuery.compressed.js" data-copied-hint="copied!" title="copy to clipboard"><span class="octicon octicon-clippy"></span></span>
  </div>
</div>


  
  <div class="commit file-history-tease">
    <img class="main-avatar" height="24" src="https://secure.gravatar.com/avatar/68381e630f863e6b76ff075e09c5139f?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
    <span class="author"><a href="/jlembeck" rel="author">jlembeck</a></span>
    <time class="js-relative-date" datetime="2012-10-30T10:57:12-07:00" title="2012-10-30 10:57:12">October 30, 2012</time>
    <div class="commit-title">
        <a href="/filamentgroup/jQuery-UI-Date-Range-Picker/commit/add94255e13312f09c43e00e6ff91d61808e984a" class="message" data-pjax="true">Recompressing with latest changes</a>
    </div>

    <div class="participation">
      <p class="quickstat"><a href="#blob_contributors_box" rel="facebox"><strong>3</strong> contributors</a></p>
          <a class="avatar tooltipped downwards" title="jameswilson" href="/filamentgroup/jQuery-UI-Date-Range-Picker/commits/master/js/daterangepicker.jQuery.compressed.js?author=jameswilson"><img height="20" src="https://secure.gravatar.com/avatar/f45223377db42e3a3d559203134cdc62?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="jlembeck" href="/filamentgroup/jQuery-UI-Date-Range-Picker/commits/master/js/daterangepicker.jQuery.compressed.js?author=jlembeck"><img height="20" src="https://secure.gravatar.com/avatar/68381e630f863e6b76ff075e09c5139f?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="chrismbarr" href="/filamentgroup/jQuery-UI-Date-Range-Picker/commits/master/js/daterangepicker.jQuery.compressed.js?author=chrismbarr"><img height="20" src="https://secure.gravatar.com/avatar/3a7f6c5a576c8a24ec942d81de56ff88?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>


    </div>
    <div id="blob_contributors_box" style="display:none">
      <h2 class="facebox-header">Users who have contributed to this file</h2>
      <ul class="facebox-user-list">
        <li class="facebox-user-list-item">
          <img height="24" src="https://secure.gravatar.com/avatar/f45223377db42e3a3d559203134cdc62?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/jameswilson">jameswilson</a>
        </li>
        <li class="facebox-user-list-item">
          <img height="24" src="https://secure.gravatar.com/avatar/68381e630f863e6b76ff075e09c5139f?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/jlembeck">jlembeck</a>
        </li>
        <li class="facebox-user-list-item">
          <img height="24" src="https://secure.gravatar.com/avatar/3a7f6c5a576c8a24ec942d81de56ff88?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/chrismbarr">chrismbarr</a>
        </li>
      </ul>
    </div>
  </div>


<div id="files" class="bubble">
  <div class="file">
    <div class="meta">
      <div class="info">
        <span class="icon"><b class="octicon octicon-file-text"></b></span>
        <span class="mode" title="File Mode">file</span>
          <span>1 lines (1 sloc)</span>
        <span>8.263 kb</span>
      </div>
      <div class="actions">
        <div class="button-group">
              <a class="minibutton js-entice" href=""
                 data-entice="You must be signed in and on a branch to make or propose changes">Edit</a>
          <a href="/filamentgroup/jQuery-UI-Date-Range-Picker/raw/master/js/daterangepicker.jQuery.compressed.js" class="button minibutton " id="raw-url">Raw</a>
            <a href="/filamentgroup/jQuery-UI-Date-Range-Picker/blame/master/js/daterangepicker.jQuery.compressed.js" class="button minibutton ">Blame</a>
          <a href="/filamentgroup/jQuery-UI-Date-Range-Picker/commits/master/js/daterangepicker.jQuery.compressed.js" class="button minibutton " rel="nofollow">History</a>
        </div><!-- /.button-group -->
            <a class="minibutton danger empty-icon js-entice" href=""
               data-entice="You must be signed in and on a branch to make or propose changes">
            Delete
          </a>
      </div><!-- /.actions -->

    </div>
        <div class="blob-wrapper data type-javascript js-blob-data">
      <table class="file-code file-diff">
        <tr class="file-code-line">
          <td class="blob-line-nums">
            <span id="L1" rel="#L1">1</span>

          </td>
          <td class="blob-line-code">
                <div class='line' id='LC1'>(function(a){a.fn.daterangepicker=function(s){var d=a(this);var e=a.extend({presetRanges:[{text:&quot;Today&quot;,dateStart:&quot;today&quot;,dateEnd:&quot;today&quot;},{text:&quot;Last 7 days&quot;,dateStart:&quot;today-7days&quot;,dateEnd:&quot;today&quot;},{text:&quot;Month to date&quot;,dateStart:function(){return Date.parse(&quot;today&quot;).moveToFirstDayOfMonth()},dateEnd:&quot;today&quot;},{text:&quot;Year to date&quot;,dateStart:function(){var w=Date.parse(&quot;today&quot;);w.setMonth(0);w.setDate(1);return w},dateEnd:&quot;today&quot;},{text:&quot;The previous Month&quot;,dateStart:function(){return Date.parse(&quot;1 month ago&quot;).moveToFirstDayOfMonth()},dateEnd:function(){return Date.parse(&quot;1 month ago&quot;).moveToLastDayOfMonth()}}],presets:{specificDate:&quot;Specific Date&quot;,allDatesBefore:&quot;All Dates Before&quot;,allDatesAfter:&quot;All Dates After&quot;,dateRange:&quot;Date Range&quot;},rangeStartTitle:&quot;Start date&quot;,rangeEndTitle:&quot;End date&quot;,nextLinkText:&quot;Next&quot;,prevLinkText:&quot;Prev&quot;,target:d,doneButtonText:&quot;Done&quot;,earliestDate:Date.parse(&quot;-15years&quot;),latestDate:Date.parse(&quot;+15years&quot;),constrainDates:false,rangeSplitter:&quot;-&quot;,dateFormat:&quot;m/d/yy&quot;,closeOnSelect:true,arrows:false,appendTo:&quot;body&quot;,onClose:function(){},onOpen:function(){},onChange:function(){},datepickerOptions:null},s);var g={onSelect:function(A,z){var y=j.find(&quot;.range-start&quot;);var B=j.find(&quot;.range-end&quot;);if(j.find(&quot;.ui-daterangepicker-specificDate&quot;).is(&quot;.ui-state-active&quot;)){B.datepicker(&quot;setDate&quot;,y.datepicker(&quot;getDate&quot;))}a(this).trigger(&quot;constrainOtherPicker&quot;);var x=b(y.datepicker(&quot;getDate&quot;));var w=b(B.datepicker(&quot;getDate&quot;));if(d.length==2){d.eq(0).val(x);d.eq(1).val(w)}else{d.val((x!=w)?x+&quot; &quot;+e.rangeSplitter+&quot; &quot;+w:x)}if(e.closeOnSelect){if(!j.find(&quot;li.ui-state-active&quot;).is(&quot;.ui-daterangepicker-dateRange&quot;)&amp;&amp;!j.is(&quot;:animated&quot;)){k()}a(this).trigger(&quot;constrainOtherPicker&quot;);e.onChange()}},defaultDate:+0};d.bind(&quot;change&quot;,e.onChange);e.datepickerOptions=(s)?a.extend(g,s.datepickerOptions):g;var m,l=Date.parse(&quot;today&quot;);var o,i;if(d.size()==2){o=Date.parse(d.eq(0).val());i=Date.parse(d.eq(1).val());if(o==null){o=i}if(i==null){i=o}}else{o=Date.parse(d.val().split(e.rangeSplitter)[0]);i=Date.parse(d.val().split(e.rangeSplitter)[1]);if(i==null){i=o}}if(o!=null){m=o}if(i!=null){l=i}var j=a(&#39;&lt;div class=&quot;ui-daterangepicker ui-widget ui-helper-clearfix ui-widget-content ui-corner-all&quot;&gt;&lt;/div&gt;&#39;);var u=(function(){var y=a(&#39;&lt;ul class=&quot;ui-widget-content&quot;&gt;&lt;/ul&gt;&#39;).appendTo(j);a.each(e.presetRanges,function(){a(&#39;&lt;li class=&quot;ui-daterangepicker-&#39;+this.text.replace(/ /g,&quot;&quot;)+&#39; ui-corner-all&quot;&gt;&lt;a href=&quot;#&quot;&gt;&#39;+this.text+&quot;&lt;/a&gt;&lt;/li&gt;&quot;).data(&quot;dateStart&quot;,this.dateStart).data(&quot;dateEnd&quot;,this.dateEnd).appendTo(y)});var w=0;a.each(e.presets,function(x,z){a(&#39;&lt;li class=&quot;ui-daterangepicker-&#39;+x+&quot; preset_&quot;+w+&#39; ui-helper-clearfix ui-corner-all&quot;&gt;&lt;span class=&quot;ui-icon ui-icon-triangle-1-e&quot;&gt;&lt;/span&gt;&lt;a href=&quot;#&quot;&gt;&#39;+z+&quot;&lt;/a&gt;&lt;/li&gt;&quot;).appendTo(y);w++});y.find(&quot;li&quot;).hover(function(){a(this).addClass(&quot;ui-state-hover&quot;)},function(){a(this).removeClass(&quot;ui-state-hover&quot;)}).click(function(){j.find(&quot;.ui-state-active&quot;).removeClass(&quot;ui-state-active&quot;);a(this).addClass(&quot;ui-state-active&quot;);q(a(this),j,n,f);return false});return y})();function b(y){if(!y.getDate()){return&quot;&quot;}var x=y.getDate();var A=y.getMonth();var z=y.getFullYear();A++;var w=e.dateFormat;return a.datepicker.formatDate(w,y)}a.fn.restoreDateFromData=function(){if(a(this).data(&quot;saveDate&quot;)){a(this).datepicker(&quot;setDate&quot;,a(this).data(&quot;saveDate&quot;)).removeData(&quot;saveDate&quot;)}return this};a.fn.saveDateToData=function(){if(!a(this).data(&quot;saveDate&quot;)){a(this).data(&quot;saveDate&quot;,a(this).datepicker(&quot;getDate&quot;))}return this};function t(){if(j.data(&quot;state&quot;)==&quot;closed&quot;){v();j.fadeIn(300).data(&quot;state&quot;,&quot;open&quot;);e.onOpen()}}function k(){if(j.data(&quot;state&quot;)==&quot;open&quot;){j.fadeOut(300).data(&quot;state&quot;,&quot;closed&quot;);e.onClose()}}function c(){if(j.data(&quot;state&quot;)==&quot;open&quot;){k()}else{t()}}function v(){var w=p||d;var A=w.offset(),y=&quot;left&quot;,z=A.left,x=a(window).width()-z-w.outerWidth();if(z&gt;x){y=&quot;right&quot;,z=x}j.parent().css(y,z).css(&quot;top&quot;,A.top+w.outerHeight())}function q(z,y,A,w){if(z.is(&quot;.ui-daterangepicker-specificDate&quot;)){w.hide();A.show();y.find(&quot;.title-start&quot;).text(e.presets.specificDate);y.find(&quot;.range-start&quot;).restoreDateFromData().css(&quot;opacity&quot;,1).show(400);y.find(&quot;.range-end&quot;).restoreDateFromData().css(&quot;opacity&quot;,0).hide(400);setTimeout(function(){w.fadeIn()},400)}else{if(z.is(&quot;.ui-daterangepicker-allDatesBefore&quot;)){w.hide();A.show();y.find(&quot;.title-end&quot;).text(e.presets.allDatesBefore);y.find(&quot;.range-start&quot;).saveDateToData().datepicker(&quot;setDate&quot;,e.earliestDate).css(&quot;opacity&quot;,0).hide(400);y.find(&quot;.range-end&quot;).restoreDateFromData().css(&quot;opacity&quot;,1).show(400);setTimeout(function(){w.fadeIn()},400)}else{if(z.is(&quot;.ui-daterangepicker-allDatesAfter&quot;)){w.hide();A.show();y.find(&quot;.title-start&quot;).text(e.presets.allDatesAfter);y.find(&quot;.range-start&quot;).restoreDateFromData().css(&quot;opacity&quot;,1).show(400);y.find(&quot;.range-end&quot;).saveDateToData().datepicker(&quot;setDate&quot;,e.latestDate).css(&quot;opacity&quot;,0).hide(400);setTimeout(function(){w.fadeIn()},400)}else{if(z.is(&quot;.ui-daterangepicker-dateRange&quot;)){w.hide();A.show();y.find(&quot;.title-start&quot;).text(e.rangeStartTitle);y.find(&quot;.title-end&quot;).text(e.rangeEndTitle);y.find(&quot;.range-start&quot;).restoreDateFromData().css(&quot;opacity&quot;,1).show(400);y.find(&quot;.range-end&quot;).restoreDateFromData().css(&quot;opacity&quot;,1).show(400);setTimeout(function(){w.fadeIn()},400)}else{w.hide();y.find(&quot;.range-start, .range-end&quot;).css(&quot;opacity&quot;,0).hide(400,function(){A.hide()});var B=(typeof z.data(&quot;dateStart&quot;)==&quot;string&quot;)?Date.parse(z.data(&quot;dateStart&quot;)):z.data(&quot;dateStart&quot;)();var x=(typeof z.data(&quot;dateEnd&quot;)==&quot;string&quot;)?Date.parse(z.data(&quot;dateEnd&quot;)):z.data(&quot;dateEnd&quot;)();y.find(&quot;.range-start&quot;).datepicker(&quot;setDate&quot;,B).find(&quot;.ui-datepicker-current-day&quot;).trigger(&quot;click&quot;);y.find(&quot;.range-end&quot;).datepicker(&quot;setDate&quot;,x).find(&quot;.ui-datepicker-current-day&quot;).trigger(&quot;click&quot;)}}}}return false}var n=a(&#39;&lt;div class=&quot;ranges ui-widget-header ui-corner-all ui-helper-clearfix&quot;&gt;&lt;div class=&quot;range-start&quot;&gt;&lt;span class=&quot;title-start&quot;&gt;Start Date&lt;/span&gt;&lt;/div&gt;&lt;div class=&quot;range-end&quot;&gt;&lt;span class=&quot;title-end&quot;&gt;End Date&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;&#39;).appendTo(j);n.find(&quot;.range-start, .range-end&quot;).datepicker(e.datepickerOptions);n.find(&quot;.range-start&quot;).datepicker(&quot;setDate&quot;,m);n.find(&quot;.range-end&quot;).datepicker(&quot;setDate&quot;,l);n.find(&quot;.range-start, .range-end&quot;).bind(&quot;constrainOtherPicker&quot;,function(){if(e.constrainDates){if(a(this).is(&quot;.range-start&quot;)){j.find(&quot;.range-end&quot;).datepicker(&quot;option&quot;,&quot;minDate&quot;,a(this).datepicker(&quot;getDate&quot;))}else{j.find(&quot;.range-start&quot;).datepicker(&quot;option&quot;,&quot;maxDate&quot;,a(this).datepicker(&quot;getDate&quot;))}}}).trigger(&quot;constrainOtherPicker&quot;);var f=a(&#39;&lt;button class=&quot;btnDone ui-state-default ui-corner-all&quot;&gt;&#39;+e.doneButtonText+&quot;&lt;/button&gt;&quot;).click(function(){j.find(&quot;.ui-datepicker-current-day&quot;).trigger(&quot;click&quot;);k()}).hover(function(){a(this).addClass(&quot;ui-state-hover&quot;)},function(){a(this).removeClass(&quot;ui-state-hover&quot;)}).appendTo(n);a(this).click(function(){c();return false});n.hide().find(&quot;.range-start, .range-end, .btnDone&quot;).hide();j.data(&quot;state&quot;,&quot;closed&quot;);n.find(&quot;.ui-datepicker&quot;).css(&quot;display&quot;,&quot;block&quot;);a(e.appendTo).append(j);j.wrap(&#39;&lt;div class=&quot;ui-daterangepickercontain&quot;&gt;&lt;/div&gt;&#39;);if(e.arrows&amp;&amp;d.size()==1){var h=a(&#39;&lt;a href=&quot;#&quot; class=&quot;ui-daterangepicker-prev ui-corner-all&quot; title=&quot;&#39;+e.prevLinkText+&#39;&quot;&gt;&lt;span class=&quot;ui-icon ui-icon-circle-triangle-w&quot;&gt;&#39;+e.prevLinkText+&quot;&lt;/span&gt;&lt;/a&gt;&quot;);var r=a(&#39;&lt;a href=&quot;#&quot; class=&quot;ui-daterangepicker-next ui-corner-all&quot; title=&quot;&#39;+e.nextLinkText+&#39;&quot;&gt;&lt;span class=&quot;ui-icon ui-icon-circle-triangle-e&quot;&gt;&#39;+e.nextLinkText+&quot;&lt;/span&gt;&lt;/a&gt;&quot;);a(this).addClass(&quot;ui-rangepicker-input ui-widget-content&quot;).wrap(&#39;&lt;div class=&quot;ui-daterangepicker-arrows ui-widget ui-widget-header ui-helper-clearfix ui-corner-all&quot;&gt;&lt;/div&gt;&#39;).before(h).before(r).parent().find(&quot;a&quot;).click(function(){var x=n.find(&quot;.range-start&quot;).datepicker(&quot;getDate&quot;);var w=n.find(&quot;.range-end&quot;).datepicker(&quot;getDate&quot;);var y=Math.abs(new TimeSpan(x-w).getTotalMilliseconds())+86400000;if(a(this).is(&quot;.ui-daterangepicker-prev&quot;)){y=-y}n.find(&quot;.range-start, .range-end &quot;).each(function(){var z=a(this).datepicker(&quot;getDate&quot;);if(z==null){return false}a(this).datepicker(&quot;setDate&quot;,z.add({milliseconds:y})).find(&quot;.ui-datepicker-current-day&quot;).trigger(&quot;click&quot;)});return false}).hover(function(){a(this).addClass(&quot;ui-state-hover&quot;)},function(){a(this).removeClass(&quot;ui-state-hover&quot;)});var p=d.parent()}a(document).click(function(){if(j.is(&quot;:visible&quot;)){k()}});j.click(function(){return false}).hide();return this}})(jQuery);</div>
          </td>
        </tr>
      </table>
  </div>

  </div>
</div>

<a href="#jump-to-line" rel="facebox[.linejump]" data-hotkey="l" class="js-jump-to-line" style="display:none">Jump to Line</a>
<div id="jump-to-line" style="display:none">
  <form accept-charset="UTF-8" class="js-jump-to-line-form">
    <input class="linejump-input js-jump-to-line-field" type="text" placeholder="Jump to line&hellip;" autofocus>
    <button type="submit" class="button">Go</button>
  </form>
</div>

          </div>
        </div>

      </div><!-- /.repo-container -->
      <div class="modal-backdrop"></div>
    </div>
  </div><!-- /.site -->


    </div><!-- /.wrapper -->

      <div class="container">
  <div class="site-footer">
    <ul class="site-footer-links right">
      <li><a href="https://status.github.com/">Status</a></li>
      <li><a href="http://developer.github.com">API</a></li>
      <li><a href="http://training.github.com">Training</a></li>
      <li><a href="http://shop.github.com">Shop</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/about">About</a></li>

    </ul>

    <a href="/">
      <span class="mega-octicon octicon-mark-github"></span>
    </a>

    <ul class="site-footer-links">
      <li>&copy; 2013 <span title="0.04007s from fe2.rs.github.com">GitHub</span>, Inc.</li>
        <li><a href="/site/terms">Terms</a></li>
        <li><a href="/site/privacy">Privacy</a></li>
        <li><a href="/security">Security</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
  </div><!-- /.site-footer -->
</div><!-- /.container -->


    <div class="fullscreen-overlay js-fullscreen-overlay" id="fullscreen_overlay">
  <div class="fullscreen-container js-fullscreen-container">
    <div class="textarea-wrap">
      <textarea name="fullscreen-contents" id="fullscreen-contents" class="js-fullscreen-contents" placeholder="" data-suggester="fullscreen_suggester"></textarea>
          <div class="suggester-container">
              <div class="suggester fullscreen-suggester js-navigation-container" id="fullscreen_suggester"
                 data-url="/filamentgroup/jQuery-UI-Date-Range-Picker/suggestions/commit">
              </div>
          </div>
    </div>
  </div>
  <div class="fullscreen-sidebar">
    <a href="#" class="exit-fullscreen js-exit-fullscreen tooltipped leftwards" title="Exit Zen Mode">
      <span class="mega-octicon octicon-screen-normal"></span>
    </a>
    <a href="#" class="theme-switcher js-theme-switcher tooltipped leftwards"
      title="Switch themes">
      <span class="octicon octicon-color-mode"></span>
    </a>
  </div>
</div>



    <div id="ajax-error-message" class="flash flash-error">
      <span class="octicon octicon-alert"></span>
      <a href="#" class="octicon octicon-remove-close close ajax-error-dismiss"></a>
      Something went wrong with that request. Please try again.
    </div>

    
  </body>
</html>

