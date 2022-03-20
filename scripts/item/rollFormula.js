import Item5e from '../../../../systems/dnd5e/module/item/entity.js';
import { AsyncFunction, MODULE_TITLE } from "../const.js";
import { jankyPatch } from "../util.js";

const preRollFormulaPatch = `
const formula = rollData.item.formula;

if (this instanceof CONFIG.Item.documentClass && !!formula && !!rollData) {
  const allowed = Hooks.call('Item5e.preRollFormula', this, formula, rollData);
  if ( allowed === false ) return null;
}

const roll = await new Roll(formula, rollData).roll({async: true});
`

const postRollFormulaPatch = `
if (this instanceof CONFIG.Item.documentClass && roll !== undefined) {
  Hooks.callAll('Item5e.rollFormula', this, roll);
}

return roll;
`;

export function jankyPatchRollFormula() {
  try {
    const withPreHook = jankyPatch(Item5e.prototype.rollFormula.toString(), {
      firstLineString: "async rollFormula({spellLevel}={}) {\n",
      regex: /const roll = (\s|.)+?\}\);/,
      patch: preRollFormulaPatch,
    });
  
    const withPreHookFn = new AsyncFunction("{spellLevel}={}", withPreHook);

    const withPreAndPostHook = jankyPatch(withPreHookFn.toString(), {
      firstLineString: ") {\n",
      regex: /return roll;/,
      patch: postRollFormulaPatch,
    });

    Item5e.prototype.rollFormula =  new AsyncFunction("{spellLevel}={}", withPreAndPostHook);
  } catch(err) {
    console.error(MODULE_TITLE, '|', `There was an error patching "rollFormula":`, err, 'Original Function was not replaced.');
  }
}

/**
 * A hook event that fires before an Item rolls a Formula Roll.
 * @param {Item5e} item       The Item that rolls the Formula Roll
 * @param {string} formula           Formula that will be rolled
 * @param {object} rollData           Roll config which will be provided to the Roll instance
 */
 function preRollFormula() { }

/**
 * A hook event that fires after an Item's "Other Formula" is rolled
 * @param {Item5e} item       The Item being rolled
 * @param {Roll} result       The roll instance after evaluation
 */
function rollFormula() {}