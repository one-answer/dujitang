import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  quoteType?: 'poison' | 'comfort' | 'kfc';
  quoteContent?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = '毒鸡汤 - 有毒但有道理的心灵鸡汤',
  description = '毒鸡汤、安慰文案、疯狂星期四文案，一网打尽，每日更新，治愈你的心灵',
  keywords = '毒鸡汤,心灵鸡汤,安慰文案,疯狂星期四,肯德基文案,KFC文案,心灵治愈,文案生成,毒鸡汤网站',
  quoteType,
  quoteContent
}) => {
  useEffect(() => {
    // 动态更新页面标题
    document.title = title;

    // 动态更新 meta 描述
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // 动态更新 meta 关键词
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }

    // 动态更新 Open Graph 标签
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');

    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }

    // 动态更新 Twitter 标签
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');

    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }

    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }

    // 如果有引用内容，更新结构化数据
    if (quoteContent && quoteType) {
      const jsonLdScript = document.querySelector('script[type="application/ld+json"]');

      if (jsonLdScript) {
        try {
          const jsonLd = JSON.parse(jsonLdScript.textContent || '{}');

          // 添加引用内容到结构化数据
          const quoteTypeText =
            quoteType === 'poison' ? '毒鸡汤' :
            quoteType === 'comfort' ? '安慰文案' :
            '疯狂星期四文案';

          // 添加引用作为 Article 类型
          const articleData = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": `${quoteTypeText} - ${quoteContent?.substring(0, 110)}`,
            "description": quoteContent,
            "author": {
              "@type": "Organization",
              "name": "毒鸡汤"
            },
            "publisher": {
              "@type": "Organization",
              "name": "毒鸡汤",
              "logo": {
                "@type": "ImageObject",
                "url": "https://djt.aolifu.org/og-image.svg"
              }
            },
            "datePublished": new Date().toISOString(),
            "dateModified": new Date().toISOString()
          };

          jsonLdScript.textContent = JSON.stringify(articleData);
        } catch (e) {
          console.error('Error updating JSON-LD:', e);
        }
      }
    }
  }, [title, description, keywords, quoteType, quoteContent]);

  return null; // 这个组件不渲染任何内容，只是更新 meta 标签
};

export default SEO;
