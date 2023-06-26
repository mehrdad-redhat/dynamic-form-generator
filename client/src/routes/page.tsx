import {Card as EvergreenCard, Heading, majorScale, Pane} from "evergreen-ui";
import React from "react";
import styled from "@emotion/styled";
import {Swatch} from "../theme";
import {getPage} from "../fake-data";
import {Page as PageType} from "../models"
import {QueryClient, useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import Edit from "../components/Edit";
import {Preview} from "../components/Preview";

const Container = styled(Pane)`
  display: flex;
  height: 100vh;
  width: 100%;
`

const CardWrapper = styled(Pane)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50%;
  padding: ${majorScale(4)}px;
  background-color: ${Swatch.background};
`

const Card = styled(EvergreenCard)`
  display: flex;
  flex-direction: column;
  background-color: ${Swatch.cardBackground};
  width: 100%;
  height: 100%;
  padding: ${majorScale(4)}px;
  border-radius: 8px;
`

const pageDetailQuery = (id: string) => ({
	queryKey: ['pages', 'detail', id],
	queryFn: async (): Promise<PageType> => {
		const page: PageType = await getPage(id);
		if (!page) {
			throw new Response('', {
				status: 404,
				statusText: 'Not Found',
			})
		}
		return page
	},
})

export const loader =
	(queryClient: QueryClient) =>
		async ({params}: { params: { pageId: string } }) => {
			const query = pageDetailQuery(params.pageId)
			return (
				queryClient.getQueryData(query.queryKey) ??
				(await queryClient.fetchQuery(query))
			)
		}

const Page: React.FC = () => {
	const params = useParams();
	const {data: page} = useQuery(pageDetailQuery(params.pageId!))
	if (page)
		console.log(page.name)
	return (
		<Container>
			<CardWrapper paddingRight='16px !important'>
				<Card elevation={2}>
					<Heading size={600}
					         is='h3'
					         borderBottom='1px solid #a3a3a3'
					         marginBottom={majorScale(3)}
					         paddingBottom={majorScale(3)}>Edit</Heading>
					{page && <Edit page={page}/>}
				</Card>
			</CardWrapper>
			<CardWrapper paddingLeft='16px !important'>
				<Card elevation={2}>
					<Heading size={600}
					         is='h3'
					         borderBottom='1px solid #a3a3a3'
					         marginBottom={majorScale(3)}
					         paddingBottom={majorScale(3)}>Preview</Heading>
					{page && <Preview page={page}/>}
				</Card>
			</CardWrapper>
		</Container>
	);
};

export default Page;
