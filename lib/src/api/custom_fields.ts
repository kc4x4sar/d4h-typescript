import { CustomFieldUpdate } from '../types/customField'
import { Entity } from '../entity'
import D4H, { D4H_BASE_URL } from '../d4h'
import D4HRequest from '../d4hRequest'

class CustomFields {
    private readonly _request: D4HRequest

    constructor(d4hInstance: D4H) {
        this._request = d4hInstance.request
    }



    /** @category Custom Fields */
    updateCustomFields(entity: Entity, updates: CustomFieldUpdate[], onlyMemberEditOwn: boolean): Promise<void> {
        // If no updates, no need to actually make a request. Exit early.
        if (updates.length === 0) {
            return Promise.resolve()
        }

        const url = new URL(`${D4H_BASE_URL}/team/custom-fields/${entity.entityType}/${entity.id}`)

        // From the documentation:
        // https://api.d4h.org/v2/documentation#operation/putTeamCustomfieldsEntity_typeEntity_id
        // The PUT action for fields is distinguished by Bundle. If you include one field's value
        // from a bundle (or an unbundled field's value) you must include values for all fields
        // of that bundle (or all unbundled fields)
        // ----------------------------------------------------------------------------------------
        // To ensure a mistake doesn't occur, let's ensure that *all* unbundled custom fields from the original
        // entity are in the list of updates.
        //
        // At this time we don't actively use any custom fields in a bundle. To save on the additional complexity,
        // bundled custom fields are not supported and will result in an error if attempting to update them.

        // At this time all entities we're working with have custom fields. As a result, throw an
        // error if none are found. This most likely indicates the original request was made without
        // including custom fields.
        const originalCustomFields = entity.custom_fields
        if (!originalCustomFields) {
            throw new Error('Cannot update custom fields for an entity with no custom fields. Ensure your original request included custom fields.')

        }

        // For any fields not being changed, back fill from the original entity to ensure
        // they retain the same value.
        for (const field of originalCustomFields) {
            const update = updates.find((u) => u.id == field.id)
            if (update) {
                if (onlyMemberEditOwn && !field.member_edit_own) {
                    throw new Error('onlyMemberEditOwn specified, but attempting to update non-memberEditOwn field.')
                } else if (field.bundle) {
                    throw new Error('One or more custom fields being updated are part of a bundle. Updating fields in a bundle is not supported.')
                }
            } else {
                let include = true
                if (field.bundle || (onlyMemberEditOwn && !field.member_edit_own)) {
                    include = false
                }

                if (include) {
                    updates.push({
                        id: field.id,
                        value: field.value
                    })
                }
            }
        }

        return this._request.putAsync(url, { fields: updates })
    }

}

export { CustomFields }