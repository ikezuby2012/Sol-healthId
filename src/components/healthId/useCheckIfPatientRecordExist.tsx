import { useEffect, useState } from 'react';
import { ErrorPage } from '../molecules/Error/error-page';


export function useCheckIfPatientRecordExist(
    accountOwners: string[] | undefined,
    currentAccount: string | null
) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        console.log(accountOwners, currentAccount);

        // Simulate a check for matching accounts
        setTimeout(() => {
            try {
                if (!accountOwners || accountOwners.length === 0) {
                    throw new Error("No accounts found.");
                }

                // Check if any account owner matches the current user public key
                const hasMatch = accountOwners.some((owner) => owner === currentAccount);

                if (!hasMatch) {
                    setError(
                        "You have not created a patient record. Please register with the correct email."
                    );
                }
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        }, 2000); // Simulate a delay for async operations
    }, [accountOwners, currentAccount]);

    // Render an error page if there is an error
    const errorComponent = error ? (
        <ErrorPage
            title="Account Not Found"
            message={error}
            showHome={true}
        />
    ) : null;

    return { isLoading, errorComponent };
}