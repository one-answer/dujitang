// URL参数处理脚本
document.addEventListener('DOMContentLoaded', function() {
  // 获取URL参数
  const urlParams = new URLSearchParams(window.location.search);
  const quoteType = urlParams.get('type');
  
  // 如果存在type参数，触发相应的按钮点击
  if (quoteType) {
    setTimeout(() => {
      // 等待React组件加载完成
      const buttons = document.querySelectorAll('button');
      
      if (quoteType === 'poison') {
        // 点击毒鸡汤按钮
        const poisonButton = Array.from(buttons).find(button => 
          button.textContent.includes('毒鸡汤'));
        if (poisonButton) poisonButton.click();
      } else if (quoteType === 'comfort') {
        // 点击安慰文案按钮
        const comfortButton = Array.from(buttons).find(button => 
          button.textContent.includes('安慰文案'));
        if (comfortButton) comfortButton.click();
      } else if (quoteType === 'kfc') {
        // 点击疯狂星期四按钮
        const kfcButton = Array.from(buttons).find(button => 
          button.textContent.includes('疯狂星期四'));
        if (kfcButton) kfcButton.click();
      }
    }, 1000); // 给React一些时间来渲染组件
  }
});
