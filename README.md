# More Hooks D&D5e

![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2FElfFriend-DnD%2Ffoundryvtt-more-hooks-5e%2Fmain%2Fmodule.json&label=Foundry%20Version&query=$.compatibleCoreVersion&colorB=orange)
![Latest Release Download Count](https://img.shields.io/badge/dynamic/json?label=Downloads@latest&query=assets%5B1%5D.download_count&url=https%3A%2F%2Fapi.github.com%2Frepos%2FElfFriend-DnD%2Ffoundryvtt-more-hooks-5e%2Freleases%2Flatest)
![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fmore-hooks-5e&colorB=4aa94a)
[![Foundry Hub Endorsements](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Fmore-hooks-5e%2Fshield%2Fendorsements)](https://www.foundryvtt-hub.com/package/more-hooks-5e/)
[![Foundry Hub Comments](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Fmore-hooks-5e%2Fshield%2Fcomments)](https://www.foundryvtt-hub.com/package/more-hooks-5e/)

[![ko-fi](https://img.shields.io/badge/-buy%20me%20a%20coke-%23FF5E5B)](https://ko-fi.com/elffriend)
[![patreon](https://img.shields.io/badge/-patreon-%23FF424D)](https://www.patreon.com/ElfFriend_DnD)

Adds more [hooks](https://foundryvtt.wiki/en/development/api/hooks) to the 5e system. This is intended to be a library module for other modules (or Hook Macro users) to leverage.

Its goal is to eventually contribute these hooks directly to the core 5e system and disappear. The API is going to follow Semantic Versioning as it is likely to undergo sizable changes as the hooks are hammered out.

> LPT: Use `CONFIG.debug.hooks = true` or [Developer Mode](https://github.com/League-of-Foundry-Developers/foundryvtt-devMode) to more easily explore what a hook does and when it fires.

## API

## Actors

### Actor5e.preApplyDamage(actor, amount, updates)
A hook event that fires before an Actor takes damage. Note this only fires when the `applyDamage` method is called, not when the actor's HP is updated manually.



| Param   | Type                 | Description                                                                                                             |
| ------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| actor   | <code>Actor5e</code> | The Actor that took the damage                                                                                          |
| amount  | <code>number</code>  | The total amount of damage the actor took. Informational, does not drive update.                                        |
| updates | <code>object</code>  | The updates about to be made to the actor's hp. This should be mutated to affect the outcome of the damage application. |


### Actor5e.applyDamage(actor, totalDamageTaken)
A hook event that fires after an Actor takes damage. Note this only fires when the `applyDamage` method is called, not when the actor's HP is updated manually.



| Param            | Type                 | Description                               |
| ---------------- | -------------------- | ----------------------------------------- |
| actor            | <code>Actor5e</code> | The Actor after taking damage             |
| totalDamageTaken | <code>number</code>  | The total amount of damage the actor took |


### Actor5e.preRollAbilitySave(actor, rollData, abilityId)
A hook event that fires before an Actor rolls a Ability Save. This will fire before the configuration dialog appears.



| Param     | Type                 | Description                                         |
| --------- | -------------------- | --------------------------------------------------- |
| actor     | <code>Actor5e</code> | The Actor that rolled the ability save              |
| rollData  | <code>object</code>  | The rolldata being provided to the D20Roll instance |
| abilityId | <code>string</code>  | The ability id (e.g. "str")                         |


### Actor5e.rollAbilitySave(actor, result, abilityId)
A hook event that fires after an Actor rolls a Ability Save



| Param     | Type                 | Description                            |
| --------- | -------------------- | -------------------------------------- |
| actor     | <code>Actor5e</code> | The Actor that rolled the ability save |
| result    | <code>D20Roll</code> | The Result of the ability save         |
| abilityId | <code>string</code>  | The ability id (e.g. "str")            |


### Actor5e.preRollAbilityTest(actor, rollData, abilityId)
A hook event that fires before an Actor rolls a Ability Test. This will fire before the configuration dialog appears.



| Param     | Type                 | Description                                         |
| --------- | -------------------- | --------------------------------------------------- |
| actor     | <code>Actor5e</code> | The Actor that rolled the ability test              |
| rollData  | <code>object</code>  | The rolldata being provided to the D20Roll instance |
| abilityId | <code>string</code>  | The ability id (e.g. "str")                         |


### Actor5e.rollAbilityTest(actor, result, abilityId)
A hook event that fires after an Actor rolls a Ability Test



| Param     | Type                 | Description                            |
| --------- | -------------------- | -------------------------------------- |
| actor     | <code>Actor5e</code> | The Actor that rolled the ability test |
| result    | <code>D20Roll</code> | The Result of the ability test         |
| abilityId | <code>string</code>  | The ability id (e.g. "str")            |


### Actor5e.preRollDeathSave(actor, rollData)
A hook event that fires before an Actor rolls a Death Save



| Param    | Type                 | Description                                                |
| -------- | -------------------- | ---------------------------------------------------------- |
| actor    | <code>Actor5e</code> | The Actor that rolled the death save                       |
| rollData | <code>object</code>  | Roll config which will be provided to the d20Roll function |


### Actor5e.rollDeathSave(actor, result, success)
A hook event that fires after an Actor's Death Save has been evaluated



| Param   | Type                 | Description                                  |
| ------- | -------------------- | -------------------------------------------- |
| actor   | <code>Actor5e</code> | The Actor that rolled the death save         |
| result  | <code>D20Roll</code> | The Result of the death save                 |
| success | <code>boolean</code> | Whether or not the death save was successful |


### Actor5e.preRollHitDie(actor, rollData)
A hook event that fires before an Actor rolls a hit die.



| Param    | Type                 | Description                                            |
| -------- | -------------------- | ------------------------------------------------------ |
| actor    | <code>Actor5e</code> | The Actor that rolled a hitDie                         |
| rollData | <code>object</code>  | The rolldata being provided to the DamageRoll instance |


### Actor5e.rollHitDie(actor, roll)
A hook event that fires after an Actor has healed from a hit die roll.



| Param | Type                    | Description                         |
| ----- | ----------------------- | ----------------------------------- |
| actor | <code>Actor5e</code>    | The Actor that took the damage      |
| roll  | <code>DamageRoll</code> | The resulting roll from the hit die |


### Actor5e.preRollSkill(actor, rollData, skillId)
A hook event that fires before an Actor rolls a Skill Check. This will fire before the configuration dialog appears.



| Param    | Type                 | Description                                         |
| -------- | -------------------- | --------------------------------------------------- |
| actor    | <code>Actor5e</code> | The Actor that rolled the skill check               |
| rollData | <code>object</code>  | The rolldata being provided to the D20Roll instance |
| skillId  | <code>string</code>  | The skill id (e.g. "ins")                           |


### Actor5e.rollSkill(actor, result, skillId)
A hook event that fires after an Actor rolls a Skill Check



| Param   | Type                 | Description                           |
| ------- | -------------------- | ------------------------------------- |
| actor   | <code>Actor5e</code> | The Actor that rolled the skill check |
| result  | <code>D20Roll</code> | The Result of the skill check         |
| skillId | <code>string</code>  | The skill id (e.g. "ins")             |

## Items

### Item5e.preRollDamage(item, rollConfig)
A hook event that fires before an Item rolls a Damage Roll. This happens before the Roll Config dialog appears.



| Param      | Type                | Description                                                   |
| ---------- | ------------------- | ------------------------------------------------------------- |
| item       | <code>Item5e</code> | The Item that rolls the Damage Roll                           |
| rollConfig | <code>object</code> | Roll config which will be provided to the damageRoll function |


### Item5e.rollDamage(item, result)
A hook event that fires after an Item rolls a Damage Roll



| Param  | Type                    | Description                         |
| ------ | ----------------------- | ----------------------------------- |
| item   | <code>Item5e</code>     | The Item that rolls the Damage Roll |
| result | <code>DamageRoll</code> | The Result of the Damage Roll       |


### Item5e.preDisplayCard(item, chatData)
A hook event that fires before an Item Roll's chat message is created



| Param    | Type                | Description                                       |
| -------- | ------------------- | ------------------------------------------------- |
| item     | <code>Item5e</code> | The Item being rolled                             |
| chatData | <code>object</code> | The data that will be provided to the ChatMessage |


### Item5e.displayCard(item, chatMessage)
A hook event that fires after an Item Roll's chat message is created



| Param       | Type                                            | Description                                                                            |
| ----------- | ----------------------------------------------- | -------------------------------------------------------------------------------------- |
| item        | <code>Item5e</code>                             | The Item being rolled                                                                  |
| chatMessage | <code>ChatMessage</code> \| <code>object</code> | The created ChatMessage instance or ChatMessageData depending on options.createMessage |


### Item5e.preRoll(item, options, usageParameters)
A hook event that fires before an Item's roll workflow begins. This happens before the Ability Use Dialog is shown.



| Param                            | Type                 | Description                                                                                                                             |
| -------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| item                             | <code>Item5e</code>  | The Item that rolls the Attack Roll                                                                                                     |
| options                          | <code>object</code>  | The options passed to the Item.roll method.                                                                                             |
| [options.configureDialog]        | <code>boolean</code> | Display a configuration dialog for the item roll, if applicable?                                                                        |
| [options.rollMode]               | <code>string</code>  | The roll display mode with which to display (or not) the card                                                                           |
| [options.createMessage]          | <code>boolean</code> | Whether to automatically create a chat message (if true) or simply                                                                      |
| usageParameters                  | <code>object</code>  | Usage Parameters that will create the Ability use Dialog. These can change what the user is prompted for during the ability use dialog. |
| usageParameters.consumeRecharge  | <code>boolean</code> | Should the item consume its recharge?                                                                                                   |
| usageParameters.consumeResource  | <code>boolean</code> | Should the item consume the configured resource item?                                                                                   |
| usageParameters.consumeSpellSlot | <code>boolean</code> | Should the item consume a spell slot?                                                                                                   |
| usageParameters.consumeUsage     | <code>boolean</code> | Should the item consume the configured charges?                                                                                         |
| usageParameters.consumeQuantity  | <code>boolean</code> | Should the item consume its own quantity?                                                                                               |


### Item5e.preRollConsumption(item)
A hook event that fires before an Item's usage updates are calculated.



| Param                             | Type                 | Description                                                                                                                                                                                                                         |
| --------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| item                              | <code>Item5e</code>  | The Item that rolls the Attack Roll //  * @param {object} usageParameters      Usage Parameters from the Ability use Dialog. These are passed into Item5e._getUsageUpdates to determine the actor and item changes to be committed. |
| usageParameters.consumeRecharge   | <code>boolean</code> | Should the item consume its recharge?                                                                                                                                                                                               |
| usageParameters.consumeResource   | <code>boolean</code> | Should the item consume the configured resource item?                                                                                                                                                                               |
| usageParameters.consumeSpellLevel | <code>string</code>  | What level spell should the item consume? This should be either 'pact' or 'spell1', 'spell2', etc                                                                                                                                   |
| usageParameters.consumeUsage      | <code>boolean</code> | Should the item consume the configured charges?                                                                                                                                                                                     |
| usageParameters.consumeQuantity   | <code>boolean</code> | Should the item consume its own quantity?                                                                                                                                                                                           |


### Item5e.roll(item, chatMessage)
A hook event that fires after an Item is rolled



| Param       | Type                                            | Description                                                                   |
| ----------- | ----------------------------------------------- | ----------------------------------------------------------------------------- |
| item        | <code>Item5e</code>                             | The Item being rolled                                                         |
| chatMessage | <code>ChatMessage</code> \| <code>object</code> | The created ChatMessage or ChatMessageData depending on options.createMessage |


### Item5e.preRollAttack(item, rollConfig)
A hook event that fires before an Item rolls an Attack Roll. This happens before the Roll Config dialog appears.



| Param      | Type                | Description                                                |
| ---------- | ------------------- | ---------------------------------------------------------- |
| item       | <code>Item5e</code> | The Item that rolls the Attack Roll                        |
| rollConfig | <code>object</code> | Roll config which will be provided to the d20Roll function |


### Item5e.rollAttack(item, result)
A hook event that fires after an Item rolls an Attack Roll



| Param  | Type                 | Description                         |
| ------ | -------------------- | ----------------------------------- |
| item   | <code>Item5e</code>  | The Item that rolls the Attack Roll |
| result | <code>D20Roll</code> | The Result of the Attack Roll       |


### Item5e.preRollFormula(item, formula, rollData)
A hook event that fires before an Item rolls a Formula Roll.



| Param    | Type                | Description                                             |
| -------- | ------------------- | ------------------------------------------------------- |
| item     | <code>Item5e</code> | The Item that rolls the Formula Roll                    |
| formula  | <code>string</code> | Formula that will be rolled                             |
| rollData | <code>object</code> | Roll config which will be provided to the Roll instance |


### Item5e.rollFormula(item, result)
A hook event that fires after an Item's "Other Formula" is rolled



| Param  | Type                | Description                        |
| ------ | ------------------- | ---------------------------------- |
| item   | <code>Item5e</code> | The Item being rolled              |
| result | <code>Roll</code>   | The roll instance after evaluation |


### Item5e.preRollRecharge(item)
A hook event that fires before an Item's Recharge attempt is rolled.



| Param | Type                | Description                         |
| ----- | ------------------- | ----------------------------------- |
| item  | <code>Item5e</code> | The Item that is rolling a recharge |


### Item5e.rollRecharge(item, result, success)
Occurs after an Item's Recharge attempt is rolled



| Param   | Type                 | Description                 |
| ------- | -------------------- | --------------------------- |
| item    | <code>Item5e</code>  | The Item being recharged    |
| result  | <code>Roll</code>    | The result of the d6 roll   |
| success | <code>boolean</code> | Was the recharge a success? |


### Item5e.preRollRecharge(item, rollConfig)
A hook event that fires before an Item's Recharge attempt is rolled.



| Param      | Type                | Description                                                |
| ---------- | ------------------- | ---------------------------------------------------------- |
| item       | <code>Item5e</code> | The Item that is rolling a recharge                        |
| rollConfig | <code>object</code> | Roll config which will be provided to the d20Roll function |


### Item5e.rollToolCheck(item, result)
A hook event that fires after an Item rolls a Tool Check



| Param  | Type                 | Description                        |
| ------ | -------------------- | ---------------------------------- |
| item   | <code>Item5e</code>  | The Item that rolls the Tool Check |
| result | <code>D20Roll</code> | The Result of the Tool Check Roll  |

