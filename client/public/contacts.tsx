import * as React from 'react'
import {Form, useFetcher, useParams} from 'react-router-dom'
import {getPage, updatePage} from '../pages'
import {useQuery} from '@tanstack/react-query'

const pageDetailQuery = (id) => ({
    queryKey: ['pages', 'detail', id],
    queryFn: async () => {
        const page = await getPage(id)
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
    (queryClient) =>
        async ({params}) => {
            const query = pageDetailQuery(params.pageId)
            return (
                queryClient.getQueryData(query.queryKey) ??
                (await queryClient.fetchQuery(query))
            )
        }

export const action =
    (queryClient) =>
        async ({request, params}) => {
            let formData = await request.formData()
            const page = await updatePage(params.pageId, {
                favorite: formData.get('favorite') === 'true',
            })
            await queryClient.invalidateQueries({queryKey: ['pages']})
            return page
        }

export default function Page() {
    const params = useParams()
    const {data: page} = useQuery(pageDetailQuery(params.pageId))

    return (
        <div id="page">
            <div>
                <img key={page.avatar} src={page.avatar || null}/>
            </div>

            <div>
                <h1>
                    {page.first || page.last ? (
                        <>
                            {page.first} {page.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{' '}
                    <Favorite page={page}/>
                </h1>

                {page.twitter && (
                    <p>
                        <a target="_blank" href={`https://twitter.com/${page.twitter}`}>
                            {page.twitter}
                        </a>
                    </p>
                )}

                {page.notes && <p>{page.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            // eslint-disable-next-line no-restricted-globals
                            if (!confirm('Please confirm you want to delete this record.')) {
                                event.preventDefault()
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

function Favorite({page}) {
    const fetcher = useFetcher()
    let favorite = page.favorite
    if (fetcher.formData) {
        favorite = fetcher.formData.get('favorite') === 'true'
    }

    return (
        <fetcher.Form method="post">
            <button
                name="favorite"
                value={favorite ? 'false' : 'true'}
                aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                {favorite ? '★' : '☆'}
            </button>
        </fetcher.Form>
    )
}
