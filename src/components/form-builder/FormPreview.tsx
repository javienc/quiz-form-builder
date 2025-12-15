
import { useSelector } from 'react-redux';
import { selectActiveForm } from '../../store/selectors';

export function FormPreview() {
    const form = useSelector(selectActiveForm);

    if (!form) return;

    return (
        <div style={{ maxWidth: '600px', backgroundColor: 'white', borderTop: '5px solid #4CAF50', margin: '40px auto', padding: '40px', color: '#000' }}>

            <h2 style={{ marginBottom: '20px', fontSize: '30px' }}>{
                form.title} (Preview)
            </h2>

            <form onSubmit={e => e.preventDefault()}>

                {form.fields.map(field => (
                    <div key={field.id} className="mb-4">
                        <label className="block font-bold text-lg mb-1">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>

                        {field.type === 'text' && <input className="w-full p-2 border rounded" />}

                        {field.type === 'checkbox' && <input type="checkbox" className="mr-2 text-lg" />}

                        {field.type === 'dropdown' && (
                            <select className="w-full p-2 border rounded">
                                <option>Option A</option>
                                <option>Option B</option>
                                <option>Option C</option>
                            </select>
                        )}
                    </div>
                ))}

                <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">Submit Form</button>
            </form>
        </div>
    )
}
