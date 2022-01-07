import { MODULE_NAME } from "../const.js";

export function patchRollSkill() {
  libWrapper.register(MODULE_NAME, 'CONFIG.Actor.documentClass.prototype.rollSkill', rollSkillPatch, "WRAPPER");
}

async function rollSkillPatch(wrapper, skillId, options, ...rest) {
  const result = await wrapper(skillId, options, ...rest);

  if (!result) return result;

  const actor = this;

  Hooks.callAll('Actor5e.rollSkill', actor, result, skillId, options);

  return result;
}

/**
 * A hook event that fires after an Actor rolls a Skill Check
 * @param {Actor5e} actor       The Actor that rolled the skill check
 * @param {D20Roll} result           The Result of the skill check
 * @param {string} skillId      The skill id (e.g. "ins")
 * @param {object} options      Options which configured how the skill check was rolled
 */
function rollSkill() { }
