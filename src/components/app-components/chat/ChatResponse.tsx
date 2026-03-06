export default function ResponseContainer({ response }: { response: string }) {
    return (
        <div className="w-full max-w-3xl p-4 rounded-lg bg-slate-100 text-slate-800">
            {response}
        </div>
    );
}
