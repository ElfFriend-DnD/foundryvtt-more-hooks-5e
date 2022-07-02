import Item5e from '../../../../systems/dnd5e/module/item/entity.js';
import { AsyncFunction, MODULE_TITLE } from "../const.js";
import { jankyPatch } from "../util.js";

const preRollRechargePatch = `
if (this instanceof CONFIG.Item.documentClass) {
  const allowed = Hooks.call('Item5e.preRollRecharge', this);
  if ( allowed === false ) return null;
}

const roll = await new Roll("1d6").roll({async: true});
`

const postRollRechargePatch = `
if (this instanceof CONFIG.Item.documentClass && roll !== undefined && success !== undefined) {
  Hooks.callAll('Item5e.rollRecharge', this, roll, success);
}

return Promise.all(promises).then(() => roll);
`;

export function jankyPatchRollRecharge() {
  try {
    const withPreHook = jankyPatch(Item5e.prototype.rollRecharge.toString(), {
      firstLineString: "async rollRecharge() {\n",
      regex: /const roll = await new Roll\("1d6"\).roll\(\{async: true\}\);/,
      patch: preRollRechargePatch,
    });
  
    const withPreHookFn = new AsyncFunction(withPreHook);

    const withPreAndPostHook = jankyPatch(withPreHookFn.toString(), {
      firstLineString: ") {\n",
      regex: /return Promise.all\(promises\).then\(\(\) => roll\);/,
      patch: postRollRechargePatch,
    });

    Item5e.prototype.rollRecharge =  new AsyncFunction(withPreAndPostHook);
  } catch(err) {
    console.error(MODULE_TITLE, '|', `There was an error patching "rollRecharge":`, err, 'Original Function was not replaced.');
  }
}

/**
 * A hook event that fires before an Item's Recharge attempt is rolled.
 * @param {Item5e} item       The Item that is rolling a recharge
 */
 function preRollRecharge() { }

/**
 * Occurs after an Item's Recharge attempt is rolled
 * @param {Item5e} item       The Item being recharged
 * @param {Roll} result       The result of the d6 roll
 * @param {boolean} success       Was the recharge a success?
 */
function rollRecharge() { }