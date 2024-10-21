const Just = () => {
    return (
        <div className="max-w-md mx-auto p-4 bg-red-100 border border-red-300 rounded-lg text-red-800 text-center">
            <p className="text-base leading-relaxed">
                You do not have permission to access this inventory. Please wait for an admin to grant you editor or admin rights, or you may choose to log out.
            </p>
        </div>
    );
};

export default Just;
