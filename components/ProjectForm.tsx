'use client'

import { SessionInterface } from "@/common.types"

type Props = {
    type: string,
    session: SessionInterface
}

const ProjectForm = ({ type, session }: Props) => {

  const handleFormSubmit = (e: React.FormEvent) => {

  }

  return (
    <form 
        onSubmit={handleFormSubmit}
        className="flextStart form"
    >

    </form>
  )
}

export default ProjectForm