import Template from '@/app/(data)/Template'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { AIoutput } from '@/utils/schema'
import { currentUser } from '@clerk/nextjs/server'
import { desc, eq } from 'drizzle-orm'
import Image from 'next/image'
import React from 'react'
import { TEMPLATE } from '@/app/dashboard/_components/TemplateListsection'
import CopyButton from './_components/CopyButton'

export interface HISTORY{
    id:Number,
    formData:string,
    aiResponse:string,
    templateSlug:string,
    createdBy:string,
    createdAt:string
}
async function History() {
    
    const user = await currentUser();

    {/* @ts-ignore */}
    const HistoryList:HISTORY[] = await db.select().from(AIoutput).where(eq(AIoutput.createdBy, user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(AIoutput.id));

    const GetTemplateName = (slug:string) => {
        const template:TEMPLATE|undefined = Template?.find((item: any) => item.slug === slug)
        return template;
    }
    
  return (
    <div className='m-5 p-5 border rounded-lg bg-white'>
        <h2 className='font-bold text-3xl'>History</h2>
        <p className='text-gray-500'>Search your previously generate AI content</p>
        <div className='grid grid-cols-7 font-bold bg-secondary mt-5 py-3 px-3'>
            <h2 className='col-span-2'>TEMPLATE</h2>
            <h2 className='col-span-2'>AI RESP</h2>
            <h2>DATE</h2>
            <h2>WORDS</h2>
            <h2>COPY</h2>
        </div>
        {HistoryList.map((item:HISTORY,index:number)=>(
            <React.Fragment key={index}>
                <div className='grid grid-cols-7 my-5 py-3 px-3'>
                    <h2 className='col-span-2 flex gap-2 items-center'>
                        {GetTemplateName(item?.templateSlug) ? (
                            <>
                                <Image src={GetTemplateName(item?.templateSlug)?.icon || ''} width={25} height={25} alt='icon' />
                                {GetTemplateName(item.templateSlug)?.name}
                            </>
                        ) : (
                            <span>Template not found</span>
                        )}
                    </h2>
                    <h2 className='col-span-2 line-clamp-3 mr-3'>{item?.aiResponse}</h2>
                    <h2>{new Date(item.createdAt).toLocaleDateString()}</h2>
                    <h2>{item?.aiResponse.length}</h2>
                    <h2>
                        <CopyButton aiResponse={item.aiResponse} />
                    </h2>
                </div>
                <hr/>
            </React.Fragment>
        ))}
    </div>
  )
}

export default History