
export interface HTMLContentProps {
	html: string
}

export const HTMLContent = ({ html }:HTMLContentProps) => {
	if (html.length === 0) {
		return <div>Nothing to display</div>
	}

	return <div>{html}</div>
}
