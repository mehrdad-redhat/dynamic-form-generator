import {ElementType, Page} from "./models";

export const PAGES:Page[] = [
	{
		_id:"p12n234",
		name:"Employees",
		elements:[
			{
				type:ElementType.TEXT,
				name:"first-name",
			},
			{
				type:ElementType.TEXT,
				name:"last-name",
			},
			{
				type:ElementType.CHECKBOX,
				name:"married"
			},
			{
				type:ElementType.RADIO,
				name:"gender",
				choices:["male", "female"]
			},
			{
				type:ElementType.SELECT,
				name:"city",
				choices:["London", "New York", "Paris"]
			}
		]
	},
	{
		_id:"p13n399",
		name:"Companies",
		elements:[
			{
				type:ElementType.TEXT,
				name:"name"
			},
			{
				type:ElementType.RADIO,
				name:"size",
				choices:["small", "medium", "large"]
			},
			{
				type: ElementType.CHECKBOX,
				name:"accounted",
			}
		]
	},
	{
		_id:"p15n794",
		name:"Empty",
		elements:[]
	}
]
export async function getPages(){
	return new Promise<Page[]>((resolve,reject)=>{
		setTimeout(()=>{
			resolve(PAGES)
		},2000)
	})
}

export async function getPage(id:string){
	return new Promise<Page>((resolve,reject)=>{
		setTimeout(()=>{
			const foundedPage = PAGES.find(page => page._id === id)
			resolve(foundedPage!)
		},2000)
	})
}

export async function createPage(name:string){
	return new Promise<Page>((resolve,reject)=>{
		setTimeout(()=>{
			const newPage : Page = {
				_id: `p${Math.floor(Math.random()*100)}n${Math.floor(Math.random()*1000)}`,
				name,
				elements:[]
			}
			resolve(newPage)
		},2000)
	})
}
