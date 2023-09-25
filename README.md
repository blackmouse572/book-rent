# BOOK RENT WEBSITE

This is a website for renting books. It is a project for the course "Web Programming" at the FPT University.

## Installation

1. Clone the project

```bash
git clone https://github.com/blackmouse572/book-rent.git
```

2. Install the dependencies

```bash
npm install -g yarn # if you don't have yarn installed
yarn
```

3. Run the development server

```bash
yarn dev
```

## Contributing

### Convention

- Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages
- Use [Prettier](https://prettier.io/) for code formatting
- Use [ESLint](https://eslint.org/) for linting

### Branching

- `master` branch is for production
- `develop` branch is for development
- `feature/<feature-name>` branch is for developing a new feature
- `bugfix/<bug-name>` branch is for fixing a bug
- `hotfix/<hotfix-name>` branch is for fixing a bug in production

### Pull Request

- Create a pull request from a feature/bugfix/hotfix branch to `develop` branch
- Create a pull request from `develop` branch to `master` branch when the development is done

## Folder Structure

``` bash
. # root
├── .github # github actions
├── .vscode # vscode settings
├── components # react components
├──── ui # atomic components
├──── * # other components (form, nav, etc.)  
├── pages # pages - page should only contain components and not nested
├── public # static files
├── styles # global styles
├── lib # functions for external use, one lib per file

```
