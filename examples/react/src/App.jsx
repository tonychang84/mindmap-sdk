import React, { useState, useEffect, useRef, useCallback } from 'react'

// ⚠️ 请替换为你的 API Key
const API_KEY = 'mkmqEK31NDxcuTsWV4bHDds3mOONd3ML5V8fH3D9cYk=';

const buildDefaultData = () => ({
  ApiKey: API_KEY,
  rootNode: {
    value: {
      text: "SDK介绍\n寻简思维导图",
      textColor: 16777215,
      textFontSize: 22,
      backgroundColor: 0,
      backgroundColorAlpha: 1,
      borderColor: 0,
      borderWidth: 2,
      mindElementShape: 0,
      alignmentType: 1,
      styleCells: [
        { startIndex: 5, endIndex: 14, textFontSize: 16 },
        { startIndex: 0, endIndex: 3, textFontSize: 32, textColor: 16770432, textBold: true }
      ]
    },
    children: [
      {
        value: { text: "快速集成", textColor: 16777215, textFontSize: 16, backgroundColor: 14434048, backgroundColorAlpha: 1 },
        children: [
          { value: { text: "iframe 嵌入", textFontSize: 14 }, children: [] },
          { value: { text: "postMessage 通信", textFontSize: 14 }, children: [] },
          { value: { text: "READY 事件监听", textFontSize: 14 }, children: [] }
        ]
      },
      {
        value: { text: "数据结构", textColor: 15658734, textFontSize: 16, backgroundColor: 4860506, backgroundColorAlpha: 1 },
        children: [
          { value: { text: "SDKDatas", textFontSize: 14 }, children: [] },
          { value: { text: "节点树 (rootNode)", textFontSize: 14 }, children: [] },
          { value: { text: "MindmapSDKSubjectData", textFontSize: 14 }, children: [] }
        ]
      },
      {
        value: { text: "样式定制", textColor: 15658734, textFontSize: 16, backgroundColor: 2771514, backgroundColorAlpha: 1 },
        children: [
          { value: { text: "30+ 种骨架布局", textFontSize: 14 }, children: [] },
          { value: { text: "30 种配色方案", textFontSize: 14 }, children: [] },
          { value: { text: "节点形状自定义", textFontSize: 14 }, children: [] }
        ]
      },
      {
        value: { text: "导出与交互", textColor: 15658734, textFontSize: 16, backgroundColor: 5909034, backgroundColorAlpha: 1 },
        children: [
          { value: { text: "保存为图片", textFontSize: 14 }, children: [] },
          { value: { text: "点击事件响应", textFontSize: 14 }, children: [] }
        ]
      }
    ]
  },
  styleIndex: 5,
  frameworkIndex: 0,
  lineWidth: 2.5,
  lineLayout: 1,
  layout: 19,
  mindType: 1,
  mindBGColor: 16777215,
  showSaveImageButton: true,
  lineColors: [16724736, 14434048, 2236962, 3355443, 5909034, 5592405, 0, 1118481, 2236962, 3355443, 4473924, 5592405]
})

function App() {
  const [isReady, setIsReady] = useState(false)
  const [status, setStatus] = useState('⏳ 加载 SDK...')
  const iframeRef = useRef(null)

  // 监听 SDK 消息（只执行一次）
  useEffect(() => {
    const handleMessage = (event) => {
      console.log('📩 收到消息:', event.origin, event.data)

      if (!event.origin.includes('web.mindyushu.com')) {
        console.warn('⚠️ 忽略非 SDK 消息:', event.origin)
        return
      }
      if (event.source !== iframeRef.current?.contentWindow) {
        console.warn('⚠️ 消息来源不是当前 iframe')
        return
      }

      const data = event.data
      if (data.type === 'READY' && data.value === 'OK') {
        console.log('✅ SDK 已就绪')
        setIsReady(true)
        setStatus('✅ SDK 已就绪')
        
        // 直接发送数据（避免闭包问题）
        const iframe = iframeRef.current
        if (iframe && iframe.contentWindow) {
          const sdkData = buildDefaultData()
          try {
            iframe.contentWindow.postMessage({
              type: 'MINDMAP',
              data: JSON.stringify(sdkData)
            }, 'https://web.mindyushu.com')
            setStatus('✅ 数据已发送')
          } catch (e) {
            console.error('发送失败', e)
            setStatus('❌ 发送失败')
          }
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // 主动 ping（兜底）
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isReady && iframeRef.current) {
        try {
          iframeRef.current.contentWindow.postMessage({ type: 'PING' }, 'https://web.mindyushu.com')
        } catch (e) {}
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [isReady])

  // 重新渲染
  const handleReload = useCallback(() => {
    setStatus('🔄 重新渲染...')
    const iframe = iframeRef.current
    if (iframe && iframe.contentWindow) {
      const sdkData = buildDefaultData()
      try {
        iframe.contentWindow.postMessage({
          type: 'MINDMAP',
          data: JSON.stringify(sdkData)
        }, 'https://web.mindyushu.com')
        setStatus('✅ 数据已发送')
      } catch (e) {
        console.error('发送失败', e)
        setStatus('❌ 发送失败')
      }
    }
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>🧠 寻简 <span>思维导图</span></h1>
        <a href="https://www.mindyushu.com/api.html" target="_blank" className="btn-primary">
          🔑 申请 API Key
        </a>
      </header>

      <main className="sdk-wrapper">
        <div className="sdk-toolbar">
          <div className="status">
            <span className={`dot ${status.includes('✅') ? 'ready' : status.includes('⚠️') || status.includes('❌') ? 'error' : 'loading'}`}></span>
            <span>{status}</span>
          </div>
          <button className="btn-primary" onClick={handleReload}>
            🔄 重新渲染
          </button>
        </div>

        <div className="sdk-container">
          <iframe
            ref={iframeRef}
            src="https://web.mindyushu.com/sdk"
            allow="clipboard-write"
            title="寻简思维导图 SDK"
          />
        </div>
      </main>

      <footer className="app-footer">
        <span>📖 <a href="https://www.mindyushu.com/help.html" target="_blank">完整文档</a></span>
        <span>💬 <a href="https://www.mindyushu.com/contact.html" target="_blank">联系我们</a></span>
        <span>🔑 <a href="https://www.mindyushu.com/api.html" target="_blank">申请 API Key</a></span>
      </footer>
    </div>
  )
}

export default App