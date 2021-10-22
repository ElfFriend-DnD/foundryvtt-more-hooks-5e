# More Hooks D&D5e

![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2FElfFriend-DnD%2Ffoundryvtt-more-hooks-5e%2Fmain%2Fmodule.json&label=Foundry%20Version&query=$.compatibleCoreVersion&colorB=orange)
![Latest Release Download Count](https://img.shields.io/badge/dynamic/json?label=Downloads@latest&query=assets%5B1%5D.download_count&url=https%3A%2F%2Fapi.github.com%2Frepos%2FElfFriend-DnD%2Ffoundryvtt-more-hooks-5e%2Freleases%2Flatest)
![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fmore-hooks-5e&colorB=4aa94a)
[![Foundry Hub Endorsements](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Fmore-hooks-5e%2Fshield%2Fendorsements)](https://www.foundryvtt-hub.com/package/more-hooks-5e/)
[![Foundry Hub Comments](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Fmore-hooks-5e%2Fshield%2Fcomments)](https://www.foundryvtt-hub.com/package/more-hooks-5e/)

[![ko-fi](https://img.shields.io/badge/-buy%20me%20a%20coke-%23FF5E5B)](https://ko-fi.com/elffriend)
[![patreon](https://img.shields.io/badge/-patreon-%23FF424D)](https://www.patreon.com/ElfFriend_DnD)

Adds more [hooks](https://foundryvtt.wiki/en/development/guides/Hooks_Listening_Calling) to the 5e system. This is intended to be a library module for other modules (or Hook Macro users) to leverage.

Its goal is to eventually contribute these hooks directly to the core 5e system and disappear. The API is going to follow Semantic Versioning as it is likely to undergo sizable changes as the hooks are hammered out.

> LPT: Use `CONFIG.debug.hooks = true` or [Developer Mode](https://github.com/League-of-Foundry-Developers/foundryvtt-devMode) to more easily explore what a hook does and when it fires.

## API

### Actors

#### Actor5e.rollAbilitySave(actor, result, abilityId, options)

A hook event that fires after an Actor rolls a Ability Save

| Param     | Type                 | Description                                              |
| --------- | -------------------- | -------------------------------------------------------- |
| actor     | <code>Actor5e</code> | The Actor that rolled the ability save                   |
| result    | <code>D20Roll</code> | The Result of the ability save                           |
| abilityId | <code>string</code>  | The ability id (e.g. "str")                              |
| options   | <code>object</code>  | Options which configured how the ability save was rolled |

#### Actor5e.rollAbilityTest(actor, result, abilityId, options)

A hook event that fires after an Actor rolls a Ability Test

| Param     | Type                 | Description                                              |
| --------- | -------------------- | -------------------------------------------------------- |
| actor     | <code>Actor5e</code> | The Actor that rolled the ability test                   |
| result    | <code>D20Roll</code> | The Result of the ability test                           |
| abilityId | <code>string</code>  | The ability id (e.g. "str")                              |
| options   | <code>object</code>  | Options which configured how the ability test was rolled |

#### Actor5e.rollDeathSave(actor, result, options)

A hook event that fires after an Actor rolls a Ability Save

| Param   | Type                 | Description                                            |
| ------- | -------------------- | ------------------------------------------------------ |
| actor   | <code>Actor5e</code> | The Actor that rolled the death save                   |
| result  | <code>D20Roll</code> | The Result of the death save                           |
| options | <code>object</code>  | Options which configured how the death save was rolled |

#### Actor5e.rollSkill(actor, result, skillId, options)

A hook event that fires after an Actor rolls a Skill Check

| Param   | Type                 | Description                                             |
| ------- | -------------------- | ------------------------------------------------------- |
| actor   | <code>Actor5e</code> | The Actor that rolled the skill check                   |
| result  | <code>D20Roll</code> | The Result of the skill check                           |
| skillId | <code>string</code>  | The skill id (e.g. "ins")                               |
| options | <code>object</code>  | Options which configured how the skill check was rolled |

### Items

#### Item5e.roll(item, chatMessage, [options])

A hook event that fires after an Item is rolled

| Param                     | Type                                            | Description                                                                   |
| ------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------- |
| item                      | <code>Item5e</code>                             | The Item being rolled                                                         |
| chatMessage               | <code>ChatMessage</code> \| <code>object</code> | The created ChatMessage or ChatMessageData depending on options.createMessage |
| [options]                 | <code>object</code>                             |                                                                               |
| [options.configureDialog] | <code>boolean</code>                            | Display a configuration dialog for the item roll, if applicable?              |
| [options.rollMode]        | <code>string</code>                             | The roll display mode with which to display (or not) the card                 |
| [options.createMessage]   | <code>boolean</code>                            | Whether to automatically create a chat message (if true) or simply return     |

#### Item5e.rollAttack(item, result, [options], [actor])

A hook event that fires after an Item rolls an Attack Roll

| Param     | Type                 | Description                                              |
| --------- | -------------------- | -------------------------------------------------------- |
| item      | <code>Item5e</code>  | The Item that rolls the Attack Roll                      |
| result    | <code>D20Roll</code> | The Result of the Attack Roll                            |
| [options] | <code>object</code>  | Roll options which were provided to the d20Roll function |
| [actor]   | <code>Actor5e</code> | The Actor that owns the item                             |

#### Item5e.rollDamage(item, result, [config], [actor])

A hook event that fires after an Item rolls a Damage Roll

| Param               | Type                    | Description                                                      |
| ------------------- | ----------------------- | ---------------------------------------------------------------- |
| item                | <code>Item5e</code>     | The Item that rolls the Damage Roll                              |
| result              | <code>DamageRoll</code> | The Result of the Damage Roll                                    |
| [config]            | <code>object</code>     |                                                                  |
| [config.event]      | <code>object</code>     | The event which triggered this roll, if any                      |
| [config.critical]   | <code>boolean</code>    | Should damage be rolled as a critical hit?                       |
| [config.spellLevel] | <code>number</code>     | If the item is a spell, override the level for damage scaling    |
| [config.versatile]  | <code>boolean</code>    | If the item is a weapon, roll damage using the versatile formula |
| [config.options]    | <code>object</code>     | Additional options passed to the damageRoll function             |
| [actor]             | <code>Actor5e</code>    | The Actor that owns the item                                     |

#### Item5e.rollFormula(item, result, [options])

A hook event that fires after an Item's "Other Formula" is rolled

| Param                | Type                 | Description                                                                   |
| -------------------- | -------------------- | ----------------------------------------------------------------------------- |
| item                 | <code>Item5e</code>  | The Item being rolled                                                         |
| result               | <code>Roll</code>    | The created ChatMessage or ChatMessageData depending on options.createMessage |
| [options]            | <code>object</code>  |                                                                               |
| [options.spellLevel] | <code>boolean</code> | Level at which a spell is cast.                                               |

#### Item5e.rollRecharge(item, result, success, [actor])

Occurs after an Item's Recharge attempt is rolled

| Param   | Type                 | Description                  |
| ------- | -------------------- | ---------------------------- |
| item    | <code>Item5e</code>  | The Item being recharged     |
| result  | <code>Roll</code>    | The result of the d6 roll    |
| success | <code>boolean</code> | Was the recharge a success?  |
| [actor] | <code>Actor5e</code> | The Actor that owns the item |

#### Item5e.rollToolCheck(item, result, [options], [actor])

A hook event that fires after an Item rolls a Tool Check

| Param     | Type                 | Description                                              |
| --------- | -------------------- | -------------------------------------------------------- |
| item      | <code>Item5e</code>  | The Item that rolls the Tool Check                       |
| result    | <code>D20Roll</code> | The Result of the Tool Check Roll                        |
| [options] | <code>object</code>  | Roll options which were provided to the d20Roll function |
| [actor]   | <code>Actor5e</code> | The Actor that owns the item                             |
