
import { MODULE_NAME } from "../const.js";
import { socket } from '../../setup.js';
import { prepareOptions, getCommonArguments } from "../utils.js";

export function patchRollSkill() {
  libWrapper.register(MODULE_NAME, 'CONFIG.Actor.documentClass.prototype.rollSkill', rollSkillPatch, "WRAPPER");
}

async function rollSkillPatch(wrapper, skillId, options, ...rest) {
  const result = await wrapper(skillId, options, ...rest);

  const actorUuid = this.uuid;
  const cleanedOptions = prepareOptions(options);

  socket.executeForEveryone(rollSkill, actorUuid, result, skillId, cleanedOptions, getCommonArguments());

  return result;
}

/**
 * A hook event that fires after an Actor rolls a Skill Check
 * @param {Actor5e} actor       The Actor that rolled the skill check
 * @param {D20Roll} result           The Result of the skill check
 * @param {string} skillId      The skill id (e.g. "ins")
 * @param {object} options      Options which configured how the skill check was rolled
 * @param {CommonArguments} commonArgs   A set of common arguments for utility
 */
export async function rollSkill(actorUuid, result, skillId, cleanedOptions, commonArgs) {
  const actorOrToken = await fromUuid(actorUuid);
  const actor = actorOrToken instanceof TokenDocument ? actorOrToken.actor : actorOrToken;

  const resultRoll = game.dnd5e.dice.D20Roll.fromData(result);

  Hooks.callAll('Actor5e.rollSkill', actor, resultRoll, skillId, cleanedOptions, commonArgs);
}
