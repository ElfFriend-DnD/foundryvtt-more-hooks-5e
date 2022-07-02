import Item5e from '../../../../systems/dnd5e/module/item/entity.js';
import { AsyncFunction, MODULE_TITLE } from "../const.js";
import { jankyPatch } from "../util.js";

const preRollToolCheckPatch = `
if (this instanceof CONFIG.Item.documentClass && !!rollConfig) {
  const allowed = Hooks.call('Item5e.preRollToolCheck', this, rollConfig);
  if ( allowed === false ) return null;
}

const roll = await game.dnd5e.dice.d20Roll(rollConfig);

if (this instanceof CONFIG.Item.documentClass && roll !== undefined) {
  Hooks.callAll('Item5e.rollToolCheck', this, roll);
}

return roll;
`;

export function jankyPatchRollToolCheck() {
  try {
    const newFnString = jankyPatch(Item5e.prototype.rollToolCheck.toString(), {
      firstLineString: "rollToolCheck(options={}) {\n",
      regex: /return d20Roll\(rollConfig\);/,
      patch: preRollToolCheckPatch,
    });
  
    Item5e.prototype.rollToolCheck =  new AsyncFunction("options={}", newFnString);
  } catch(err) {
    console.error(MODULE_TITLE, '|', `There was an error patching "rollToolCheck":`, err, 'Original Function was not replaced.');
  }
}

/**
 * A hook event that fires before an Item's Recharge attempt is rolled.
 * @param {Item5e} item       The Item that is rolling a recharge
 * @param {object} rollConfig           Roll config which will be provided to the d20Roll function
 */
 function preRollRecharge() { }

/**
 * A hook event that fires after an Item rolls a Tool Check
 * @param {Item5e} item       The Item that rolls the Tool Check
 * @param {D20Roll} result           The Result of the Tool Check Roll
 */
function rollToolCheck() { }
