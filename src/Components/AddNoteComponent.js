import { Formik, Field, Form } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import * as ApplicationsConstants from "./util/ApplicationsConstants";
import { readOne, saveNote, updateOne } from "../services/notes.sevice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

const AddNoteComponeent = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [category, setCategory] = useState('');
    const [autoIncrementId, setAutoIncrementId] = useState(null);



    const handleSubmit = async (values) => {
        let response = null;
        if (values.id) {
            const response = await updateOne(values);
        }
        else {
            const response = await saveNote(values);
        }
        if (!response) {
            throw Error('Error occured while  storing into the database ');
        }
        console.log(`printing the responce object ${response.data}`);
        navigate("/")
    }


    const getNoteById = async () => {
        try {
            const response = await readOne(id);
            const existing = response.data;
            setTitle(existing.title);
            setBody(existing.body);
            setCategory(existing.category);
            setAutoIncrementId(existing.id);
        } catch (error) {
            console.error('Error occured while retriving the data from API');
        }
    }
    useEffect(() => {
        if (id) {
            getNoteById(id);
        }
    });
    return (
        <div>
            <h1>Add new Note</h1>
            <Formik
                initialValues={
                    {
                        title: title,
                        body: body,
                        category: category,
                        id: autoIncrementId
                    }

                }
                enableReinitialize
                onSubmit={handleSubmit}
            >
                <Form>
                    <Field id="id" name="id" type="hidden"></Field>
                    <label>title</label>
                    <Field placeholder="Enter title" name="title">

                    </Field>
                    <label>Description</label>
                    <Field placeholder="Enter Description" name="Description">
                        {({ form }) => {
                            const { setFieldValue } = form;
                            return (
                                <>
                                    <Editor
                                        apiKey={ApplicationsConstants.TINYMCE_API_KEY}
                                        value={form.values.body}
                                        init={{
                                            height: 500,
                                            menubar: true,
                                            plugins: ["image", "code", "table", "link", "media"],
                                            toolbar:
                                                'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat|help',
                                            content_style:
                                                "body{font-family: Hylvetica,Arial,san:             4px}"

                                        }}
                                        onEditorChange={(content) => {
                                            setFieldValue('body', content);
                                        }}
                                    />
                                </>
                            )
                        }}
                    </Field>
                    <label>Category</label>
                    <Field placeholder="Enter Category" name="categorie">

                    </Field>
                    <button type="submit">
                        Submit
                    </button>
                </Form>
            </Formik>
            <Link to='/mynotes'>Back to Notes</Link>
        </div>
    );
}

export default AddNoteComponeent;