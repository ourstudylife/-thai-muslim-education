import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <h1 className="font-serif text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-bold mb-4">ไม่พบหน้าที่คุณต้องการ</h2>
            <p className="text-muted-foreground max-w-md mb-8">
                หน้าที่คุณกำลังค้นหาอาจถูกย้าย ลบ หรือไม่มีอยู่จริง กรุณาตรวจสอบ URL อีกครั้งหรือกลับไปที่หน้าแรก
            </p>
            <Button asChild size="lg">
                <Link href="/">กลับสู่หน้าแรก</Link>
            </Button>
        </div>
    )
}
