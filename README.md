doppler get started

1. Install Doppler CLI `brew install dopplerhq/cli/doppler`
2. Run `doppler login` to authenticate
3. When you run Doppler commands in your project directory, it will automatically use the settings from .doppler.yaml.

Current YAML file doesn't set a default configuration.

Instead, it tells Doppler about your project and what environments exist. 

You'll need to specify which config to use (dev or prd) each time you run a command.

`doppler run --config prd -- node test_doppler.js`

`doppler run --config dev -- node test_doppler.js`

```
"scripts": {
  "start:dev": "doppler run --config dev -- node your-app.js",
  "start:prod": "doppler run --config prd -- node your-app.js"
}
```

`npm run start:dev`

`npm run start:prod`