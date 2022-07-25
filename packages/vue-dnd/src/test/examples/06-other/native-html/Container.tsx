
import { HTMLContent } from './HTMLContent'
import { TargetBox } from './TargetBox'
import {ref} from "vue";

export const Container = () => {
	const droppedHTML = ref('')
	const handleHTMLDrop = (item: { html: any }) => {
		if (item) {
			droppedHTML.value = item.html
		}
	}

	return (
		<>
			<iframe
				srcdoc={`<img src='https://react-dnd.github.io/react-dnd/favicon-32x32.png'  alt=""/>`}
			/>
			<TargetBox onDrop={handleHTMLDrop} />
			<HTMLContent html={droppedHTML.value} />
		</>
	)
}
