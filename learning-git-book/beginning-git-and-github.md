# Intro

```
$ git init # Initialize a new git database
$ git clone # Copy an existing database
$ git status # Check the status of the local project
$ git diff # Review the changes done to the project
$ git add # Tell Git to track a changed file
$ git commit # Save the current state of the project to database
$ git push # Copy the local database to a remote server
$ git pull # Copy a remote database to a local machine
$ git log # Check the history of the project
$ git branch # List, create or delete branches
$ git merge # Merge the history of two branchestogether
$ git stash # Keep the current changes stashed away to be used later
```

# Sample workflow (for GitHub)

```
$ git clone https://github.com/krasenslavov/test.git
$ cd test
$ git branch files-and-folders
$ git checkout files-folders
$ mkdir assets assets/css assets/js assets/img assets/sass assets/fonts
$ code index.html
$ code assets/css/style.css
$ git add *
$ git commit -m "Add files and folders"
$ git checkout main
$ git pull origin main
$ git merge files-and-folders
$ git push
```

# Installation and setup

```
$ choco install git
$ git --version
$ git config --global user.name "Krasen Slavov"
$ git config --global user.email "slavovkrasen@gmail.com"
$ git config --global user.editor="nano"
```

`C:\Users\Krasen\.gitconfig`

# Getting started

```
$ mkdir test
$ cd test
$ git init
$ git status
$ git add README.md
$ git rm --cached README.md # remove unstaged files
$ git commit -m "Comment text"
```

# Diving into Git

```
$ git add .gitignore
$ git commit
$ git log
```

<table>
  <tr>
    <td>config.txt</td>
    <td>config.txt in any directory</td>
    <td>
      config.txt<br />      
      local/config.txt
  </td>
  </tr>
  <tr>
    <td>build/</td>
    <td>Any build directory and all files in it. But not a file named build</td>
    <td>
      build/target.bin<br />
      build/output.exe<br />
      NOT output/build
    </td>
  </tr>
  <tr>
    <td>build</td>
    <td>Any build directory, all files in it, and any file named build</td>
    <td>
      build/target.bin<br />
      output/build
    </td>
  </tr>
  <tr>
    <td>∗.exe</td>
    <td>All files with the extension.exe</td>
    <td>
      target.exe<br />
      output/res.exe
    </td>
  </tr>
  <tr>
    <td>bin/∗.exe</td>
    <td>All files with the extension .exe in the bin/ directory</td>
    <td>bin/output.exe</td>
  </tr>
  <tr>
    <td>temp∗</td>
    <td>All files with name beginning by temp</td>
    <td>
      Temp<br />
      temp.bin<br />
      temp_output.exe
    </td>
  </tr>
  <tr>
    <td>∗∗/configs</td>
    <td>Any directory named configs</td>
    <td>
    configs/prod.py 
    local/configs/preprod.py
    </td>
  </tr>
  <tr>
    <td>∗∗/configs/local.py</td>
    <td>Any file named local.py in any directory named configs</td>
    <td>
      configs/local.py<br />
      server/configs/local.py<br />
      NOT configs/fr/local.py
    </td>
  </tr>
  <tr>
    <td>
      output/<br />
      ∗∗/result.exe
    </td>
    <td>Any file named result.exe in any directory inside output</td>
    <td>
      output/result.exe<br />
      output/latest/result.exe<br />
      output/1991/12/16/result.exe
    </td>
  </tr>
</table>

```
*.exe # Igonre all exe files
!*.output.ext # Except output.exe
```

<table>
  <tr>
    <td>git log --reverse</td>
    <td>Reverse the order of commits</td>
    <td></td>
  </tr>
    <tr>
    <td>git log -n &lt;number&gt;</td>
    <td>Limit the number of commits shown</td>
    <td>git log -n 10</td>
  </tr>
    <tr>
    <td>
      git log --since=&lt;date&gt;<br />
      git log –after=&lt;date&gt;
    </td>
    <td>Only show commits after a certain date</td>
    <td>git log --since=2018/11/11</td>
  </tr>
    <tr>
    <td>
      git log --until=&lt;date&gt;<br />
      git log --before=&lt;date&gt;
    </td>
    <td>Only show commits before a certain date</td>
    <td></td>
  </tr>
    <tr>
    <td>git log --author=&lt;name&gt;</td>
    <td>Show all commits from a specific bauthor</td>
    <td>git log --author=Krasen</td>
  </tr>
    <tr>
    <td>git log --stat</td>
    <td>Show change statistics</td>
    <td></td>
  </tr>
  <tr>
    <td>git log --graph</td>
    <td>Show commits in a simple graph</td>
    <td></td>
  </tr>
</table>

```
$ git log
$ git show 1234567
$ git diff
$ git diff README.md
$ git diff --staged
```

# Commits

#### Revert a commit

```
$ git log --oneline
$ git revert 1234567
$ git add README.md
$ git commit -m "Commit after revert"
```

#### Modifing a commit

```
$ git status
$ git add README.md
$ git commit -m "This message was not complete or incorrect"
$ git reset --soft HEAD~1
$ git reset HEAD README.md
$ git status
$ git add README.md HELLO.md
$ git commit -m "Modified commit with latest changes"
```

#### Ammending a commit

```
git commit --amend
```

> - Amending should only be used to correct typos and add forgotten files or very small changes.
> - The correct way to change something is to make a new commit. The past is the past. Let it go.

# Best practices

- You should not write messages longer than 50 characters.
- Begin the message by a capital letter.
- Don’t end the message with a period.
- Use the present time and ditch unnecessary articles.
- Commit messages should be consistent.
- The messages must be clear and contextualized.
- Don’t go crazy on the details. (WHY not WHAT)

<table>
  <tr>
    <td>Best</td>
    <td>Bad</td>
    <td>Worst</td>
  </tr>
  <tr>
    <td>[login] Fix typo in DB call</td>
    <td>Fixed typo in DB call </td>
    <td>Fix typo</td>
  </tr>
  <tr>
    <td>Refactor login function for reuse</td>
    <td>Changing login function by moving declarations to parameters</td>
    <td>Code refactoring</td>
  </tr>
  <tr>
    <td>Add new API for user program check</td>
    <td>Adding a new API for user program check</td>
    <td>New user API</td>
  </tr>
</table>

> - The most important thing to remember is that a commit is a change in the project that should stand on its own.
> - Make sure to write clear messages for your small, independent commits.

- Make changes (in the Working Directory)
- Stage every changed file (in the Staging Index)
- Commit the project (in the Repository)

# Quick start with Github

1. Create empty GitHub repository

```
$ mkdir todo-list
$ cd todo-list
$ git init
$ git remote add origin https://github.com/krasenslavov/todo-list.git
$ git remote # get remote name
$ git remote -v # get remote push & fetch urls
$ git remote rm todo-list # remove remote repository
$ code README.md
$ git add README.md
$ git commit -m "Initial commit"
$ git push origin master
```

# Beginning project management: Issues

- Using Issues for project management
- Interacting with an issue (adding Labels, Assign Developers, etc)

> One of the duties of the project manager is to plan in advance all the tasks that need to be done. The plans don’t need to be very precise yet (in the real world they never are), but it is necessary to have a list of all the tasks that need to be done. Those tasks can be either new features, bugfixing, or just a team discussion. In GitHub, those tasks are called Issues.

> An issue is used to track new feature development, bugfixing, or new ideas that a team member suggested. They are the brick and mortar of GitHub project management; in theory, no action should be done with an issue being attached to it. The aim of each action you take should be the resolving of an issue.

> Long gone are the days where planning the next steps was done by boring team meetings; now you know exactly what will be your next steps and most importantly what is everybody else doing.

> Suggesting new ideas to your coworkers is easier than ever; just open an issue to discuss it with your team without using another app of email client. The biggest plus for using issues is that the history is kept forever—each feature, each bug, and each discussion.

- Linking issues with commits (Have title, body and footer commit message)

```
$ code index.html
$ git add index.html
$ git commit -m "Add index.html that contains the project skeleton" -m "See: #2"
$ git push origin master
```

> No commit should be pushed without being tied to an issue; it’s better for the management of the project.

- Closing an issue using keywords `$git commit -m "..." -m "Resolved #3"`

```
close
closes
closed
fix
fixes
fixed
resolve
resolves
resolved
```

# Diving into project management : Branches

- Production branch, where you will release stable versions of your project
- Development branch, where you will test your latest version
- Patching branch, where you will work on your issues

#### GitHub Workflow

1. Create a branch
2. Work on that branch
3. And create a pull request

```
$ git branch # list all branches
$ git branch develop # create new branch
$ git checkout develop # switch to branch
$ git checkout -b develop # create and switch to branch
$ git branch -d develop # delete branch
$
```

```
$ git checkout develop
$ git branch improve-readme-description
$ git checkout improve-readme-description
$ code README.md
$ git add README.md
$ git commit -m "..." -m "See: #4"
$ git log
$ git checkout develop
$ git merge improve-readme-description
$ git log --oneline
$ git push origin develop
```

> Can't delete the current branch, need to switch to another one.

# Better project management : Pull Requests

```
$ git pull origin master
```

> A PR is just asking for permission to execute a pull action on a remote repository.

```
$ git checkout develop
$ git branch improve-app-style
$ git checkout improve-app-style
code index.html
$ git add index.html
$ git commit -m "Add basic color changes on item rows" -m "See: #7"
$ git push origin improve-app-style
```

# Conflicts

The main takeaway concerning pulling is that it’s actually two commands executed one after another:

> - Fetching, which copies the remote branch into a temporary branch
> - Merging, which merges the temporary branch into the current one

```
$ git log  --oneline --graph
$ git show 30e51f5
```

To merge two branches together, you must have the target branch checked out.

```
$ git checkout master
$ git merge develop
$ git diff master..develop
```

> - The first thing to remember is don’t commit irectly to your main branches.
> - To put it simply: every change you intend to introduce into your master or develop branches should be done by merging.
> - And each merge must be introduced by a Pull Request.
> - You should always use PRs to introduce changes in the main branches even if you work alone.
> - . Thus, a
>   PR should do only one thing, be it a bugfix, a feature proposal, or documentation changes.
> - Don’t be tempted to fix several issues with a
>   single PR.
> - It is necessary for your team to discuss which ones to use for each project; most teams use Unix-style line endings so Windows users should configure their Git client accordingly.
> - Many of your merge conflicts won’t come from code clash; many will come from formatting and whitespace differences.For example, a trailing return space or the number of indentation spaces can introduce conflicts even though the code hasn’t changed.

```
git merge --abort
```

# Git GUI Tools

```
$ git gui
...
$ git add index.html style.css
$ git reset HEAD index.html
$ git reset HEAD style.css
```

- Using GITK `Repository > Visualize all branch history`
- Using VSCode Git, open `git init` folder.
- Using GitHub Desktop https://desktop.github.com/
- Using GitKraken http://www.gitkraken.com

# Advanced Git Commands

#### Reverting

```
$ code README.md
$ git checkout -- README.md
```

#### Stashing

```
$ code README.md
$ git stash push
$ git status
$ git stash list
$ git stash show
$ git stash pop # apply the stash to main branch
```

#### Resetting

> Resetting should only be done in the last resort. Prefer reverting the commit if possible or just straight-up continue to work on a new branch.

```
$ git reset --hard origin/separate-code-and-style
```

# More with GitHub

> Mainly use GitHub as project management tool and a way to connect to your collaborators.

- Wikis - use them to create project documentaion
- GitHub Pages - use it for project website hosted @ GitHub
- Releases - host your project /dist and release version @ GitHub
- Project Boards - track the advancement of your project. It goes beyond Issues, because Issues only describe a feature or a bug to be worked on; but Project Board can show you if someone is working on it or it’s only a plan to be executed.

# Common Git problems

- STARTING OVER
- CHANGE ORIGIN
- GIT DIFF IS EMPTY
- UNDO CHANGES TO A FILE
- ERROR IN COMMIT
- UNDO COMMITS
- DETACHED HEAD
- WORKED ON WRONG BRANCH
- CATCH UP WITH PARENT BRANCH
- BRANCHES HAVE DIVERGED

# Git and GitHub workflow

#### GitHub workflow

- EVERY PROJECT STARTS WITH A PROJECT
- EVERY ACTION STARTS WITH AN ISSUE
- NO DIRECT PUSH TO MASTER
- ANY MERGE INTO MASTER NEEDS A PR
- USE THE WIKI TO DOCUMENT YOUR CODE

#### Git workflow

- ALWAYS KNOW WHERE YOU ARE
- PULL REMOTE CHANGES BEFORE ANY ACTION
- TAKE CARE OF YOUR COMMIT MESSAGE
- DON'T REWRITE HISTORY
