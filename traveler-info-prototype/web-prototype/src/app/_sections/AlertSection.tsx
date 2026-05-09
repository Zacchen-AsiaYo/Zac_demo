"use client"

import { useState } from "react"
import { AlertDialog } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function AlertSection() {
  const [alert, setAlert] = useState<null | "normal-two" | "normal-one" | "destructive">(null)

  return (
    <>
      <h1 className="h1-tw mt-6">Alert</h1>

      <section className="flex flex-col gap-6">
        <h2 className="h3-tw">Normal — Two buttons</h2>
        <Button variant="primary" appearance="solid" size="md"
          className="self-start" onClick={() => setAlert("normal-two")}>
          Open alert
        </Button>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="h3-tw">Normal — One button</h2>
        <Button variant="primary" appearance="solid" size="md"
          className="self-start" onClick={() => setAlert("normal-one")}>
          Open alert
        </Button>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="h3-tw">Destructive</h2>
        <Button variant="danger" appearance="solid" size="md"
          className="self-start" onClick={() => setAlert("destructive")}>
          Open destructive alert
        </Button>
      </section>

      <AlertDialog
        open={alert === "normal-two"}
        onOpenChange={open => !open && setAlert(null)}
        title="已幫您選擇獨家破盤優惠"
        content="同意請按前往付款。若欲使用其他優惠，請按取消並輸入優惠碼。"
        primaryAction={{ label: "前往付款", onClick: () => setAlert(null) }}
        dismissAction={{ label: "取消", onClick: () => setAlert(null) }}
      />
      <AlertDialog
        open={alert === "normal-one"}
        onOpenChange={open => !open && setAlert(null)}
        title="登入失敗"
        content="請重新檢查您的帳號及密碼是否正確。"
        primaryAction={{ label: "關閉", onClick: () => setAlert(null) }}
      />
      <AlertDialog
        open={alert === "destructive"}
        onOpenChange={open => !open && setAlert(null)}
        title="確認要取消此訂單？"
        content="取消訂單後，將會無法復原您的訂單"
        type="destructive"
        primaryAction={{ label: "確認", onClick: () => setAlert(null) }}
        dismissAction={{ label: "返回", onClick: () => setAlert(null) }}
      />
    </>
  )
}
