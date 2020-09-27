# Annuaire des Anciens
> A directory for the Alumni of ETIC INSA Technologies.

This webapp allows active members and alumni of ETIC INSA Technologies to connect and look up contact info of other alumni.<br>
[annuaire-anciens.etic-insa.com](https://annuaire-anciens.etic-insa.com/)

![](screenshots/welcome_screen_1.png)

## Development

1. Clone this repository locally

```sh
git clone https://github.com/ETICINSATechnologies/AnnuaireAncien_v2.0.git
```
2. Install the dependencies

```sh
npm install
```
3. Start development server

```sh
npm start
```

This runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Deployment

1. Test the build process (optional)

```sh
npm run build
```
This builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
The app is ready to be deployed!

2. Deploy

This repo has been setup with a [Github Action](https://github.com/ETICINSATechnologies/AnnuaireAncien_v2.0/actions) that works as a CD (continous deployment).<br>
To launch the auto build process, push your changes into the `production` branch.<br>
The Github Action will build and deploy the app to a [Github Page](https://github.com/ETICINSATechnologies/AnnuaireAncien_v2.0/deployments/activity_log?environment=github-pages).

You can monitor the build process on the [Github Action page](https://github.com/ETICINSATechnologies/AnnuaireAncien_v2.0/actions).

Note : The Github Page is initialised to the `gh-pages` branch. DO NOT push to this branch directly ! This might cause undesirable effects.

## Meta

Contributers :

Laurent Tainturier – [Github](https://github.com/laurenttainturier)
Sadsitha Lokuge – [Github](https://github.com/slokuge/)
Thomas Zhou – [Github](https://github.com/thozh)
