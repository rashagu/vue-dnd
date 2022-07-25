import update from 'immutability-helper'
import { Card } from './Card'
import { ItemTypes } from './ItemTypes'
import {defineComponent, ref} from "vue";
import {useDrop} from "../../../../dnd";

const style = {
	width: 400,
}

export interface ContainerState {
	cards: any[]
}

const ITEMS = [
	{
		id: 1,
		text: 'Write a cool JS library',
	},
	{
		id: 2,
		text: 'Make it generic enough',
	},
	{
		id: 3,
		text: 'Write README',
	},
	{
		id: 4,
		text: 'Create some examples',
	},
	{
		id: 5,
		text: 'Spam in Twitter and IRC to promote it',
	},
	{
		id: 6,
		text: '???',
	},
	{
		id: 7,
		text: 'PROFIT',
	},
]



interface TempProps {
	name?: string
}

export const vuePropsType = {
	name: String
}
const Container = defineComponent<TempProps>((props, {slots}) => {
	const cards = ref(ITEMS)


	const findCard = (id: string) => {
		const card = cards.value.filter((c) => `${c.id}` === id)[0] as {
			id: number
			text: string
		}
		return {
			card,
			index: cards.value.indexOf(card),
		}
	}

	const moveCard = (id: string, atIndex: number) => {
		const { card, index } = findCard(id)
		cards.value = update(cards.value, {
			$splice: [
				[index, 1],
				[atIndex, 0, card],
			],
		})
	}
	const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }))

	return () => {
		return (
			<div ref={drop} style={style}>
				{cards.value.map((card) => (
					<Card
						key={card.id}
						id={`${card.id}`}
						text={card.text}
						moveCard={moveCard}
						findCard={findCard}
					/>
				))}
			</div>
		)
	}
})

Container.props = vuePropsType

export {
	Container
}
