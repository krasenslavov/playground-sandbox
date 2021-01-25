# Chapter 1 (Git Intuition)

**Summary:** In this chapter, we introduced the basic problem space that we are working with, namely, maintaining and relating multiple versions of a collection of files and directories. We also made sure that Git was installed and downloaded the Git katas using the command git clone. Then, we briely looked at the history of a tiny repository using git log.

```
$ git clone <repository>
$ git status
$ git log --all --oneline --graph -n <number>
$ git show <commit>
```

---

# Chapter 2 (Building Commits)

**Summary:** In this chapter, we have covered the stage and how we can use that to create beautiful atomic commits. We have also discussed commit messages and
how to write them well. More importantly, we discussed a few different strategies for how to decide what patterns you want your commit messages
to follow. We touched on the simplest way of redoing a commit, using amend. Finally, we discussed how we can use the Git ignore ile to avoid
unintentional iles in our repository. Armed with this knowledge, we are ready to venture forth and create a long history of perfect commits.

```
$ git add <file|path>
$ git restore --staged <file|path>
$ git commit -m <message>
$ git commit -amend -m <message>
```

* The flow of work goes as follows: We make some changes, we stage the changes that we want to be a part of the next commit, and inally we make a commit.
* There can of course be all sorts of special scenarios, but in most cases, there should be a one-on-one ratio of commits to issues within a single repository.
* A `.gitignore` ile contains a list of patterns to be ignored. If you preix a line with an exclamation point, that pattern will be included, even if it previously has been ignored. https://gitignore.io/


**Commit header**

* The commit header is one line so it is a good practice to keep it shorter than 70 characters.
* Some use these emojis in their commit messages to signal either intent or the type of change.

**Commit body example**

* The reasoning for introducing this changeset
* Any architectural decisions
* Design choices
* Trade-offs that are not necessarily obvious in the code
* Descriptions of alternative solutions that could be considered
* A slightly more verbose description of the content of the changeset

---

# Chapter 3 (Linear History)

**Summary:** In this chapter, we irst covered using a simple branch including the HEAD
pointer that keeps track of what we currently have checked out. We also created a few commits and saw our branch pointer move as we did so. Afterward, we moved through our history with the checkout command and rounded off with some diff magic, showing us exactly what happens between two points in history. After this chapter, you should feel comfortable working with a linear branch history.

```
$ git checkout <target> #  branches, tags, or commit shas
$ git checkout -b <branch-name> <target> # checkout & branch at the same line
$ git diff --staged <commit1> <commit2>
```

* In Git, a branch is nothing more than a reference to a single commit. 

---

# Chapter 4 (Complex Branching)

**Summary:** In this chapter, we came far about talking about branches in Git and how they work. We covered the different types of merges and contrasted merges to rebases. We walked through resolving merge conlicts. We closed off the chapter with a brief description of how we can use tags to mark interesting points in our code base. Finally, we delated the detached head situation.

```
$ git branch <branch-name> <commit>
$ git merge <branch-name>
$ git rebase <target>
$ git tag <target> # git tag v1.5.2 a233ba1
$ git tag v3.0 feature -m "pre-release" # annotated tag
```

* It is key that the entire team works in a way that results in a consistent history no matter who delivers a given changeset. This most likely means everyone rebases or everyone merges.
* If you are not working on a shared branch, you should always rebase. As rebasing changes the commit shas, it is considered bad practice to rebase branches that are public. 
* A tag is a reference to a commit. Commonly, tags are used to mark released versions of our source code, so we have a named reference to the source code that produced any given version of our software.
* A detached head simply means that HEAD is pointing to a commit rather than a branch.

---

# Chapter 5 (Collaboration in Git)

**Summary:** In this chapter, we covered a few basic Git workflows and showed how you can collaborate using Git. Hopefully, you now feel more conident that you can be a valuable contributor in a software organization. It is important to me that you take charge of your workflow and do not let the workflow dictate how you work, but rather let the way you work dictate your workflow.

```
$ git clone <url> <path>
$ git remote show origin # details about our remote
$ git push
$ git fetch
$ git merge origin/master -m "Merging..."

```

* The common workflow in Git is to do some work locally and then synchronize that work with the remote. 
* Pull is a shorthand for a fetch and a merge.
* The master branch on the origin is called origin/master when we look at it from our local repository.
* Simpliied workflow, master based or centralized workflow. This workflow is known by many names and is default workflow unless you conigured your repository manager differently.
* Fork-based workflows are commonly used in open source software, where the trust model is a bit different than inside an organization.
* Pull request–based workflows are a simpler version of the fork-based workflow, starting from the fact that inside an organization we have a different trust model.
  1. Clone or fetch the repository.
  2. Create a feature branch.
  3. Do work locally and commit to your feature branch.
  4. Push your feature branch to the remote.
  5. Go to the remotes web interface and create a pull request from your feature branch to your master branch.
  6. Those that have access rights merge or request changes.
