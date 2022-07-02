import Item5e from '../../../../systems/dnd5e/module/item/entity.js';
import { AsyncFunction, MODULE_TITLE } from "../const.js";
import { jankyPatch } from "../util.js";


const preRollAttackPatch = `
if (this instanceof CONFIG.Item.documentClass && !!rollConfig) {
  const allowed = Hooks.call('Item5e.preRollAttack', this, rollConfig);
  if ( allowed === false ) return null;
}

// Invoke the d20 roll helper
const roll = await game.dnd5e.dice.d20Roll(rollConfig);
`;

const postRollAttackPatch = `
if (this instanceof CONFIG.Item.documentClass && roll !== undefined) {
  Hooks.callAll('Item5e.rollAttack', this, roll);
}
return roll;
`

export function jankyPatchRollAttack() {
  try {
    const withPreHook = jankyPatch(Item5e.prototype.rollAttack.toString(), {
      firstLineString: "rollAttack(options={}) {\n",
      regex: /\/\/ Invoke the d20 roll helper\s.+const roll = await d20Roll\(rollConfig\);/,
      patch: preRollAttackPatch,
    });
  
    const withPreHookFn = new AsyncFunction("options={}", withPreHook);

    const withPreAndPostHook = jankyPatch(withPreHookFn.toString(), {
      firstLineString: ") {\n",
      regex: /return roll;/,
      patch: postRollAttackPatch,
    });

    Item5e.prototype.rollAttack =  new AsyncFunction("options={}", withPreAndPostHook);
  } catch(err) {
    console.error(MODULE_TITLE, '|', `There was an error patching "rollAttack":`, err, 'Original Function was not replaced.');
  }
}

/**
 * A hook event that fires before an Item rolls an Attack Roll. This happens before the Roll Config dialog appears.
 * @param {Item5e} item       The Item that rolls the Attack Roll
 * @param {object} rollConfig           Roll config which will be provided to the d20Roll function
 */
 function preRollAttack() { }

/**
 * A hook event that fires after an Item rolls an Attack Roll
 * @param {Item5e} item       The Item that rolls the Attack Roll
 * @param {D20Roll} result           The Result of the Attack Roll
 */
function rollAttack() { }
