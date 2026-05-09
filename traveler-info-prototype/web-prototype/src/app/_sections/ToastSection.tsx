"use client"

import { Toast, useToast } from "@/components/ui/toast"

function ToastDemo() {
  const { show } = useToast()
  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => show({ state: "primary", title: "行程已成功加入收藏", dismissDuration: 5000 })}
        className="h-10 px-5 rounded-[4px] bg-[#1e9fd2] text-white text-base font-medium"
      >
        Primary
      </button>
      <button
        type="button"
        onClick={() => show({ state: "warning", title: "注意：訂單即將截止", body: "此優惠方案將於 2 小時後結束。", dismissDuration: 5000 })}
        className="h-10 px-5 rounded-[4px] bg-[#ffb300] text-white text-base font-medium"
      >
        Warning
      </button>
      <button
        type="button"
        onClick={() => show({ state: "error", title: "付款失敗", body: "信用卡資訊有誤，請重新輸入。", dismissDuration: 5000 })}
        className="h-10 px-5 rounded-[4px] bg-[#f4511e] text-white text-base font-medium"
      >
        Error
      </button>
      <button
        type="button"
        onClick={() => show({
          state: "primary",
          title: "已加入購物車",
          actions: [
            { label: "查看購物車", variant: "primary", onClick: () => {} },
            { label: "繼續購物", variant: "neutral", onClick: () => {} },
          ],
          dismissDuration: 8000,
        })}
        className="h-10 px-5 rounded-[4px] bg-[#055885] text-white text-base font-medium"
      >
        With actions
      </button>
    </div>
  )
}

export function ToastSection() {
  return (
    <>
      <h1 className="h1-tw">Toast</h1>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Static variants</h2>
        <div className="flex flex-col gap-3">
          <Toast state="primary" title="行程已成功加入收藏" autoDismiss={false} />
          <Toast state="primary" title="行程已成功加入收藏" body="您可以在會員中心查看所有收藏的行程。" autoDismiss={false} />
          <Toast state="warning" title="注意：訂單即將截止" body="此優惠方案將於 2 小時後結束，請儘速完成訂購。" autoDismiss={false} />
          <Toast state="error" title="付款失敗" body="您的信用卡資訊有誤，請重新輸入。" autoDismiss={false} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">With action buttons</h2>
        <div className="flex flex-col gap-3">
          <Toast
            state="primary"
            title="已加入購物車"
            autoDismiss={false}
            actions={[
              { label: "查看購物車", variant: "primary", onClick: () => {} },
              { label: "繼續購物", variant: "neutral", onClick: () => {} },
            ]}
          />
          <Toast
            state="error"
            title="連線逾時"
            body="伺服器連線失敗，請檢查網路後再試。"
            autoDismiss={false}
            actions={[
              { label: "重試", variant: "primary", onClick: () => {} },
            ]}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Live (auto-dismiss + stacking)</h2>
        <ToastDemo />
      </section>
    </>
  )
}
