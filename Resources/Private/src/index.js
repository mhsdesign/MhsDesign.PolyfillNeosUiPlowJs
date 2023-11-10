import { plow } from './removed-plow';

// this is a rather hacky way to extend the consumerApi.
// we do this not in the manifest() as this would be fired to late.

const addExportToConsumerApi = () => {

    // check if the js object look like expected:
    if (typeof window["@Neos:HostPluginAPI"] !== 'object'
        || typeof window["@Neos:HostPluginAPI"]["@vendor"] !== 'function') {
        throw new Error(`Polyfill: 'MhsDesign.PolyfillNeosUiPlowJs', cant be initialized because the consumer api was changed. 1643141497`)
    }

    /** @type function */
    const consumerApiBeforeChange = window["@Neos:HostPluginAPI"]["@vendor"];

    const getAllPackageFromConsumerApi = (...args) => {
        const packages = consumerApiBeforeChange(...args);

        if (typeof packages !== 'object') {
            console.error(`Polyfill: 'MhsDesign.PolyfillNeosUiPlowJs', expected 'packages' to be an object. 1643141500`);
            return packages;
        }

        if (typeof packages['plow'] === 'object') {
            console.error(`Polyfill: 'MhsDesign.PolyfillNeosUiPlowJs' plow is expected to be removed from the api but exists already. 1643141501`);
            return packages;
        }

        // idk if we need this try catch
        try {
            // that's why were here:
            // packages.plow = plow;
            Object.defineProperty(packages, 'plow', {
                value: plow
            });
        } catch (e) {
            console.error(`Polyfill: 'MhsDesign.PolyfillNeosUiPlowJs', couldn't add package to consumer api: '${e.message}' 1643141498`);
        }

        return packages;
    }

    // idk if we need this try catch, but since that throws, im carefully ... 'Cannot assign to read only property '@vendor' of object '#<Object>''
    // window["@Neos:HostPluginAPI"]["@vendor"] = getAllPackageFromConsumerApi
    try {
        Object.defineProperty(window["@Neos:HostPluginAPI"], "@vendor", {
            value: getAllPackageFromConsumerApi
        });
    } catch (e) {
        throw new Error(`Polyfill: 'MhsDesign.PolyfillNeosUiPlowJs', couldn't override consumer api: '${e.message}' 1643141499`)
    }
}

addExportToConsumerApi();
