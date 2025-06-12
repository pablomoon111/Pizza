# GitHub Setup Guide

## Prerequisites
- GitHub account (create one at [github.com](https://github.com))
- Git installed on your computer
- Command line access (Terminal, Command Prompt, or PowerShell)

## Step 1: Create a New Repository on GitHub

1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the details:
   - **Repository name**: `tonys-pizza-palace-pos` (or your preferred name)
   - **Description**: "A comprehensive Point of Sale system for Tony's Pizza Palace"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these files)
5. Click "Create repository"

## Step 2: Initialize Git in Your Project

Open your terminal/command prompt in the project folder and run:

```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Create your first commit
git commit -m "Initial commit - Tony's Pizza Palace POS System"

# Add your GitHub repository as origin (replace with your actual GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/tonys-pizza-palace-pos.git

# Push to GitHub
git push -u origin main
```

## Step 3: Replace YOUR_USERNAME

In the command above, replace `YOUR_USERNAME` with your actual GitHub username. The full command will look like:

```bash
git remote add origin https://github.com/johnsmith/tonys-pizza-palace-pos.git
```

## Step 4: Future Updates

After making changes to your code:

```bash
# Add changed files
git add .

# Commit with a message describing your changes
git commit -m "Add new feature or fix bug description"

# Push to GitHub
git push
```

## Alternative: Using GitHub Desktop

If you prefer a graphical interface:

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Install and sign in with your GitHub account
3. Click "Add an Existing Repository from your Hard Drive"
4. Select your project folder
5. Click "Publish repository" to upload to GitHub

## Step 5: Collaborate or Edit Online

Once uploaded, you can:
- Edit files directly on GitHub.com
- Clone the repository to other computers
- Share the repository with team members
- Use GitHub Codespaces for online editing

## Common Git Commands

```bash
# Check status of your files
git status

# See what changes you've made
git diff

# View commit history
git log

# Create a new branch for features
git checkout -b new-feature-name

# Switch between branches
git checkout main
git checkout new-feature-name

# Merge branches
git checkout main
git merge new-feature-name
```

## Troubleshooting

### If you get authentication errors:
1. Use a Personal Access Token instead of password
2. Go to GitHub Settings > Developer settings > Personal access tokens
3. Generate a new token with appropriate permissions
4. Use this token as your password when prompted

### If you get "repository already exists" error:
- The repository might already be initialized
- Check if there's already a `.git` folder in your project
- If so, skip the `git init` step

### If you want to connect to an existing repository:
```bash
git clone https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git
```

## Security Note

Never commit sensitive information like:
- Database passwords
- API keys
- Personal information
- Credit card processing credentials

Use environment variables and add them to `.gitignore` for sensitive data.