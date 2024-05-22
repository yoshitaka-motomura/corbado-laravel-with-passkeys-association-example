import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import "@corbado/webcomponent"
import {useState, useEffect} from "react";
const PASSKEY_CREATION_SUCCESSFUL = "PASSKEY_CREATION_SUCCESSFUL"
const PASSKEY_CREATION_FAILED = "PASSKEY_CREATION_FAILED"
const DEVICE_NOT_PASSKEY_READY = "DEVICE_NOT_PASSKEY_READY"
export default function Edit({ auth, mustVerifyEmail, status, associationToken, projectId }: PageProps<{ mustVerifyEmail: boolean, status?: string, associationToken: string, projectId: string }>) {
    const [ref, setRef] = useState(null)
    useEffect(() => {
        if(ref) {
          (ref as HTMLElement).addEventListener(PASSKEY_CREATION_FAILED, (e) => {
            alert("Failed to create passkey")
          })
        }
    }, [ref])
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>


                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <h2>Passkeys</h2>
                        <corbado-passkey-associate project-id={projectId} association-token={associationToken} ref={setRef} />
                    </div>


                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
