'use client'

import { emptyLegs } from '@/lib/drizzle'
import { SubmitHandler, useForm } from 'react-hook-form'
import PostEmptyLeg from './post_empty_leg'

function EmptyLegForm() {
    const methods = useForm<typeof emptyLegs.$inferInsert>()
    const { 
        register, 
        handleSubmit, 
        reset
    } = methods

    const onSubmit: SubmitHandler<typeof emptyLegs.$inferInsert> = async (data) => {
        const emptyLeg = data
        emptyLeg.start = new Date(data.start)
        emptyLeg.end = new Date(data.end)
        if (!emptyLeg.price) {
            emptyLeg.price = 0
        }
        if (!emptyLeg.order) {
            emptyLeg.order = 0
        }

        console.log(data)
        PostEmptyLeg(emptyLeg)
        reset()
    }


	return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='from'>From:</label>
                    <input
                        type='text'
                        id='from'
                        maxLength={4}
                        required
                        {...register('from')}
                        />
                </div>
                <div>
                    <label htmlFor='to'>To:</label>
                    <input
                        type='text'
                        maxLength={4}
                        id='to'
                        required
                        {...register('to')}
                        />
                </div>
                <div>
                    <label htmlFor='start'>Start:</label>
                    <input
                        type='date'
                        id='start'
                        required
                        {...register('start')}
                        />
                </div>
                <div>
                    <label htmlFor='end'>End:</label>
                    <input
                        type='date'
                        id='end'
                        required
                        {...register('end')}
                        />
                </div>
                <div>
                    <label htmlFor='price'>Price:</label>
                    <input
                        type='number'
                        id='price'
                        min='0'
                        required
                        {...register('price')}
                    />
                </div>
                <div>
                    <label htmlFor='type'>Type:</label>
                    <input 
                        type='text' 
                        id='type' 
                        {...register('type')}            
                    />
                </div>
                <div>
                    <label htmlFor='category'>Category:</label>
                    <input
                        type='text'
                        id='category'
                        {...register('category')}
                        />
                </div>
                <div>
                    <label htmlFor='company'>Company:</label>
                    <input
                        type='text'
                        id='company'
                        {...register('company')}
                        />
                </div>
                <div>
                    <label htmlFor='safety'>Safety:</label>
                    <input
                        type='text'
                        id='safety'
                        {...register('safety')}
                        />
                </div>
                <div>
                    <label htmlFor='order'>Order:</label>
                    <input
                        type='number'
                        id='order'
                        min={0}
                        {...register('order')}
                        />
                </div>
                <button type='submit'>Add empty leg</button>
            </form>
	)
}

export default EmptyLegForm
