'use client';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, TextArea, TextFieldInput, TextFieldRoot } from "@radix-ui/themes"

const NewIssuePage = () => {
    return (
        <div className="max-w-xl space-y-3">
            <TextFieldRoot>
                <TextFieldInput placeholder="Title" />
            </TextFieldRoot>
            <SimpleMDE placeholder="Description" />
            <Button>Submit New Issue</Button>
        </div>
    )
}

export default NewIssuePage