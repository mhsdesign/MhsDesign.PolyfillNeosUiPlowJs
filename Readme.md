## MhsDesign.PolyfillNeosUiPlowJs

> Temporary hack for the Neos Ui to test if a neos ui plugin requiring plow-js fundamentally works with Neos 9 or not.

Plow js was removed in Neos 9 from the consumer api see https://github.com/neos/neos-ui/issues/3425
But some plugins might still make use of it and require it to be exposed. To try out plugins and check if they fundamentally would work in Neos 9 this package provides a little temporary helping hand.

This is only meant for experimenting and you should instead either remove the plow-js calls from a plugin or bundle plow-js with it (like a normal js dependency).

### Installation

in your root composer json add:

```
{
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/mhsdesign/MhsDesign.PolyfillNeosUiPlowJs"
        }
    ],
    "require": {
        "mhsdesign/polyfillneosuiplowjs": "dev-main"
    }
}
```

### Implementation

The implementation is rather hacky as we need to implement in the Host Ui what will later be implemented here:
https://github.com/neos/neos-ui/blob/master/packages/neos-ui/src/apiExposureMap.js#L148

So we intercept what is exported via the consumer API and add the exports of the `'plow-js'` package.

Of course, this makes use of global javascript objects and functions internally used by the consumer api, but unless the implementation doesn't change (what is unlikely in a bugfix) this polyfill will continue to work.

### Replace this package
If you dont want to include the polyfill, because a package falsly claims this as a dependency then you can do a simple composer replace a la: https://github.com/neos/flow-development-collection/blob/d559aca053fd64a3b2d8ed3e3c19942f61f3b9ee/composer.json#L40 
