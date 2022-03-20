import Actor5e from '../../../../systems/dnd5e/module/actor/entity.js'
import { AsyncFunction, MODULE_TITLE } from "../const.js";
import { jankyPatch } from "../util.js";

const preRollSkillPatch = `
if (this instanceof CONFIG.Actor.documentClass && !!rollData && !!skillId) {
  const allowed = Hooks.call('Actor5e.preRollSkill', this, rollData, skillId);
  if ( allowed === false ) return;
}

const result = await game.dnd5e.dice.d20Roll(rollData);

if (this instanceof CONFIG.Actor.documentClass && !!rollData && !!skillId && !!result) {
  Hooks.callAll('Actor5e.rollSkill', this, result, skillId);
}

return result;
`;

export function jankyPatchRollSkill() {
  try {
    const newFnString = jankyPatch(Actor5e.prototype.rollSkill.toString(), {
      firstLineString: "rollSkill(skillId, options={}) {\n",
      regex: /(return d20Roll\(rollData\);)/,
      patch: preRollSkillPatch,
    });
  
    Actor5e.prototype.rollSkill =  new AsyncFunction("skillId", "options={}", newFnString);
  } catch(err) {
    console.error(MODULE_TITLE, '|', `There was an error patching "rollSkill":`, err, 'Original Function was not replaced.');
  }
}

/**
 * A hook event that fires before an Actor rolls a Skill Check. This will fire before the configuration dialog appears.
 * 
 * @param {Actor5e} actor       The Actor that rolled the skill check
 * @param {object} rollData           The rolldata being provided to the D20Roll instance
 * @param {string} skillId      The skill id (e.g. "ins")
 */
 function preRollSkill() { }


/**
 * A hook event that fires after an Actor rolls a Skill Check
 * @param {Actor5e} actor       The Actor that rolled the skill check
 * @param {D20Roll} result           The Result of the skill check
 * @param {string} skillId      The skill id (e.g. "ins")
 */
function rollSkill() { }
