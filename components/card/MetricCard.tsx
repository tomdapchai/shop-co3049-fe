import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MetricCard({
    title,
    value,
}: {
    title: string;
    value: string;
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-lg font-bold">{value}</div>
            </CardContent>
        </Card>
    );
}
