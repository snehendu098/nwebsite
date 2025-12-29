import { ReactNode } from "react";
import { SplitText } from "@/components/ui";

interface PageLayoutProps {
  children: ReactNode;
  tag: string;
  title: string;
  titleAccent: string;
  description?: string;
}

export const PageLayout = ({
  children,
  tag,
  title,
  titleAccent,
  description,
}: PageLayoutProps) => {
  return (
    <div className="page-container">
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="section-container">
          <div className="page-header">
            <span className="section-tag">{tag}</span>
            <h1 className="page-title">
              <SplitText text={title} />
              <br />
              <SplitText text={titleAccent} className="accent" />
            </h1>
            {description && <p className="page-description">{description}</p>}
          </div>
        </div>
      </section>

      <section className="page-content">{children}</section>
    </div>
  );
};
