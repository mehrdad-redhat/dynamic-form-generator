import {Card, majorScale, Pane} from "evergreen-ui";
import React from "react";

export const Contact: React.FC = () => {
	return (
		<Pane display='flex' height='100vh' width='100%'>
			<Pane display='flex' alignItems='center' justifyContent='center' height='100%' width='50%' padding={majorScale(3)} background='gray400'>
				<Card elevation={2} background='white' width='100%' height='100%'>1</Card>
			</Pane>
			<Pane display='flex' alignItems='center' justifyContent='center' height='100%' width='50%' padding={majorScale(3)} background='gray400'>
				<Card elevation={2} background='white' width='100%' height='100%'>2</Card>
			</Pane>
		</Pane>
	);
};
