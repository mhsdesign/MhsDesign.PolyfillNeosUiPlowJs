import * as plowOriginal from 'plow-js';

const MAX_WARNINGS = 30;

let warningCount = 0;

function augmentAndDeprecatedFunction(functionName, functionImplementation) {
    return function() {
        if (warningCount < MAX_WARNINGS) {
            ++warningCount;
            console.error(`Error: Plow.js "${functionName}" was removed! This polyfill (MhsDesign.PolyfillNeosUiPlowJs) is only temporary. See: https://github.com/neos/neos-ui/issues/3425`);
        }
        if (warningCount === MAX_WARNINGS) {
            ++warningCount;
            console.error(`Error: Further Plow.js deprecations will be ignored.`)
        }
        return functionImplementation.apply(this, arguments);
    };
}

const deprecatedPlow = {};

for (const functionName in plowOriginal) {
    const functionImplementation = plowOriginal[functionName];

    if (typeof functionImplementation === 'function') {
        deprecatedPlow[functionName] = augmentAndDeprecatedFunction(functionName, functionImplementation);
    } else {
        deprecatedPlow[functionName] = functionImplementation;
    }
}

export { deprecatedPlow as plow };
