'use client'

import { SessionInterface } from "@/common.types"
import { ChangeEvent, useState } from "react"
import Image from "next/image"
import FormField from "./FormField"
import { categoryFilters } from "@/constants"
import CustomMenu from "./CustomMenu"
import Button from "./Button"

type Props = {
    type: string,
    session: SessionInterface
}
const ProjectForm = ({ type, session }: Props) => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const [form, setForm] = useState({
        title: '',
        description: '',
        image: '',
        liveSiteUrl: '',
        githubUrl: '',
        category: ''
    })

    const handleFormSubmit = (e: React.FormEvent) => { 
        
    }

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const file = e.target.files?.[0]

        if(!file) return

        if(!file.type.includes('image')) return alert('Please upload an image file')

        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = () => {
            const result = reader.result as string

            handleStateChange('image', result)
        }
     }

    const handleStateChange = (fieldName: string, value: string) => { 
        setForm((prevState) => ({...prevState, [fieldName]:value}))
    }


    return (  
        <form 
            onSubmit={handleFormSubmit}
            className="flexStart form"
        >
            <div className="flexStart form_image-container">
                <label htmlFor="poster" className="flexCenter form_image-label">
                    {
                        !form.image && 'choose a poster for your project'
                    }
                </label>
                <input 
                    type="file"
                    id="image"
                    accept="image/*"
                    required={ type === 'create' }
                    className="form_image-input"
                    onChange={handleChangeImage}
                />
                {form.image && (
                    <Image
                        src={form?.image}
                        className="sm:p-10 object-contain z-20"
                        alt="Project poster"
                        fill
                    >

                    </Image>
                )}
            </div>

            <FormField 
                title='Title'
                state={form.title}
                placeholder='Title'
                isTextArea={false}
                setState= {(value) => handleStateChange('title', value)}
            />

            <FormField 
                title='Description'
                state={form.title}
                placeholder='Showcase and discover remarkablendeveloper projects.'
                isTextArea={false}
                setState= {(value) => handleStateChange('description', value)}
            />
            <FormField 
                type="url"
                title='Website URL'
                state={form.liveSiteUrl}
                placeholder='www.yourporfolio.com'
                isTextArea={false}
                setState= {(value) => handleStateChange('liveSiteUrl', value)}
            />
            <FormField 
                type="url"
                title='Website URL'
                state={form.githubUrl}
                placeholder='www.github.com/simon-melong'
                isTextArea={false}
                setState= {(value) => handleStateChange('githubUrl', value)}
            />

            {/* Custom Input for the category */}

            <CustomMenu 
                title="Category"
                state={form.category}
                filters={categoryFilters}
                setState={(value) => handleStateChange('category', value)}
            />

            <div className="flexStart w-full">
                <Button
                    title={ 
                        isSubmitting
                            ? `${type === 'create' ? 'Creating' :
                            'Editing'}`
                            : `${type === 'create' ? 'Create' : 'Edit'}`
                        }
                    type="submit"
                    leftIcon={isSubmitting ? "" : '/plus.svg'}
                    isSubmitting={isSubmitting}
                />
            </div>
        </form>
    )
}

export default ProjectForm