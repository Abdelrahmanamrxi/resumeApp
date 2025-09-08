import ResumeInterface,{getColor,TemplateProduct} from '../../../interfaces/resumeInterface'

class MinimalProfessional<T extends ResumeInterface> implements TemplateProduct {
    public resumeData:T
    constructor(resumeData:T){
        this.resumeData=resumeData
    }
  private generateExperienceItems(): string {
         if (!this.resumeData.experiences || this.resumeData.experiences.length === 0) {
            return '';
        }
        return this.resumeData.experiences.map((exp, i) => this.resumeData.experiences && `
            <div class="experience-item ${i === this.resumeData.experiences.length - 1 ? 'last-item' : ''}" 
                 style="border-color: ${getColor(this.resumeData.color.accentColor, 600)}20">
                <div class="experience-header">
                    <div class="job-title" style="color: ${getColor(this.resumeData.color.textColor, 800)}">${exp.jobTitle}</div>
                </div>
                <div class="company-date-row">
                    <div class="company-name" style="color: ${getColor(this.resumeData.color.textColor, 700)}">${exp.company}</div>
                    <p class="date-range">${exp.from.toLocaleDateString("en-US",{month:'short',year:"numeric"})} - ${exp.To.toLocaleDateString("en-US",{month:'short',year:"numeric"})}</p>
                </div>
                <ul class="experience-points">
                    ${exp.points.filter(p => p).map(point => `
                        <li class="experience-point">
                            <span class="bullet" style="color: ${getColor(this.resumeData.color.textColor, 600)}">•</span>
                            <span style="color: ${getColor(this.resumeData.color.textColor, 600)}">${point}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');
    }

    private generateEducationItems(): string {
        if (!this.resumeData.education || this.resumeData.education.length === 0) {
            return '';
        }

        return this.resumeData.education.map(edu => `
            <div class="education-item-wrapper">
                <p class="education-item">
                    <strong style="color: ${getColor(this.resumeData.color.textColor, 800)}">${edu.degree}</strong><br>
                    <span style="color: ${getColor(this.resumeData.color.textColor, 600)}">${edu.institution}</span>
                </p>
                <p class="date-range">${edu.from.toLocaleDateString("en-US",{month:'short',year:"numeric"})} - ${edu.To.toLocaleDateString("en-US",{month:'short',year:"numeric"})}</p>
            </div>
        `).join('');
    }

    private generateCertificationItems(): string {
        if (!this.resumeData.certifications || this.resumeData.certifications.length === 0) {
            return '';
        }

        return this.resumeData.certifications.map(cert => `
            <div class="certification-item-wrapper">
                <p class="certification-item">
                    <strong style="color: ${getColor(this.resumeData.color.textColor, 800)}">${cert.title}</strong><br>
                    <span style="color: ${getColor(this.resumeData.color.textColor, 600)}">${cert.issuer}</span>
                </p>
                <p class="date-range">${new Date(cert.year).toLocaleDateString("en-US",{month:'short',year:"numeric"})}</p>
            </div>
        `).join('');
    }

    

    getTemplate(): string {
        const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            line-height: 1.5;
            color: #374151;
            background-color: #f9fafb;
            padding: 1rem;
        }

        .resume-container {
            width: 100%;
            max-width: 60%;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            padding: 1.5rem;
            max-height: calc(100vh - 2rem);
            overflow-y: auto;
        }

        .header {
            text-align: center;
            border-bottom: 1px solid;
            padding-bottom: 1rem;
            margin-bottom: 1.5rem;
        }

        .header h1 {
            font-size: 1.875rem;
            font-weight: 300;
            margin-bottom: 0.25rem;
        }

        .header p {
            font-size: 0.75rem;
        }

        .section {
            margin-top: 1rem;
        }

        .section-title {
            font-size: 0.875rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.75rem;
        }

        .summary-text {
            font-size: 0.75rem;
            line-height: 1.625;
            margin-bottom: 1.5rem;
        }

        .experience-item {
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid;
        }

        .experience-item.last-item {
            border-bottom: none;
        }

        .experience-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 0.25rem;
        }

        .job-title {
            font-weight: 500;
            font-size: 0.875rem;
        }

        .company-date-row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 0.5rem;
        }

        .company-name {
            font-size: 0.75rem;
        }

        .date-range {
            color: #6b7280;
            font-size: 0.75rem;
            margin-top: 0.125rem;
        }

        .experience-points {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .experience-point {
            font-size: 0.75rem;
            display: flex;
            align-items: flex-start;
            margin-bottom: 0.25rem;
        }

        .bullet {
            margin-right: 0.5rem;
            flex-shrink: 0;
        }

        .education-item-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 0.5rem;
        }

        .education-item {
            font-size: 0.75rem;
        }

        .certification-item-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 0.5rem;
        }

        .certification-item {
            font-size: 0.75rem;
        }

        .skills-group {
            margin-bottom: 0.75rem;
        }

        .skills-label {
            font-size: 0.75rem;
            font-weight: 500;
            display: block;
            margin-bottom: 0.25rem;
        }

        .skills-list {
            font-size: 0.75rem;
        }

        .hidden {
            display: none;
        }

        /* Print styles for PDF generation */
        @media print {
            body {
                background-color: white;
                padding: 0;
            }
            
            .resume-container {
                max-width: 100%;
                margin: 0;
                border-radius: 0;
                box-shadow: none;
                padding: 1rem;
                max-height: none;
                overflow: visible;
            }
        }

        /* Responsive design */
        @media (max-width: 768px) {
            .resume-container {
                max-width: 100%;
                margin: 0;
                border-radius: 0;
            }
            
            .experience-header {
                flex-direction: column;
            }
            
            .company-date-row {
                flex-direction: column;
            }
            
            .education-item-wrapper {
                flex-direction: column;
            }
            
            .certification-item-wrapper {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="resume-container" style="color: ${getColor(this.resumeData.color.textColor, 700)}">
        <header class="header" style="border-color: ${getColor(this.resumeData.color.accentColor, 600)}">
            <h1 style="color: ${getColor(this.resumeData.color.textColor, 800)}">${this.resumeData.name}</h1>
            <p style="color: ${getColor(this.resumeData.color.textColor, 600)}">
                ${this.resumeData.email} • ${this.resumeData.phone} • ${this.resumeData.location} • ${this.resumeData.linkedin}
            </p>
        </header>

        ${this.resumeData.summary ? `
        <section class="section">
            <h2 class="section-title" style="color: ${getColor(this.resumeData.color.accentColor, 700)}">
                SUMMARY
            </h2>
            <p class="summary-text" style="color: ${getColor(this.resumeData.color.textColor, 600)}">
                ${this.resumeData.summary}
            </p>
        </section>` : ''}

        ${this.resumeData.experiences && this.resumeData.experiences.length > 0 ? `
        <section class="section">
            <h2 class="section-title" style="color: ${getColor(this.resumeData.color.accentColor, 700)}">
                EXPERIENCE
            </h2>
            ${this.generateExperienceItems()}
        </section>` : ''}

        ${this.resumeData.education && this.resumeData.education.length > 0 ? `
        <section class="section">
            <h2 class="section-title" style="color: ${getColor(this.resumeData.color.accentColor, 700)}">
                EDUCATION
            </h2>
            ${this.generateEducationItems()}
        </section>` : ''}

        ${this.resumeData.certifications && this.resumeData.certifications.length > 0 ? `
        <section class="section">
            <h2 class="section-title" style="color: ${getColor(this.resumeData.color.accentColor, 700)}">
                CERTIFICATIONS
            </h2>
            ${this.generateCertificationItems()}
        </section>` : ''}

        ${this.resumeData.skills ? `
        <section class="section">
            <h2 class="section-title" style="color: ${getColor(this.resumeData.color.accentColor, 700)}">
                SKILLS
            </h2>
            ${this.resumeData.skills.technical && this.resumeData.skills.technical.length > 0 ? `
            <div class="skills-group">
                <span class="skills-label" style="color: ${getColor(this.resumeData.color.textColor, 800)}">Technical</span>
                <span class="skills-list" style="color: ${getColor(this.resumeData.color.textColor, 600)}">
                    ${this.resumeData.skills.technical.join(" • ")}
                </span>
            </div>` : ''}
            ${this.resumeData.skills.soft && this.resumeData.skills.soft.length > 0 ? `
            <div class="skills-group">
                <span class="skills-label" style="color: ${getColor(this.resumeData.color.textColor, 800)}">Soft Skills</span>
                <span class="skills-list" style="color: ${getColor(this.resumeData.color.textColor, 600)}">
                    ${this.resumeData.skills.soft.join(" • ")}
                </span>
            </div>` : ''}
        </section>` : ''}
    </div>
</body>
</html>`;

        return template;
    }
}

export default MinimalProfessional
