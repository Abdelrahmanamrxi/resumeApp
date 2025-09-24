import ResumeDataInterface , { TemplateProduct ,getColor } from "../../../interfaces/resumeInterface";


class ModernProfessional<T extends ResumeDataInterface> implements TemplateProduct {
    public resumeData:T
    constructor(resumeData:T){
        this.resumeData=resumeData
    }
     private generateExperienceItems(): string {
        if (!this.resumeData.experiences || this.resumeData.experiences.length === 0) {
            return '';
        }

        return this.resumeData.experiences.map(exp => `
            <div class="experience-item">
                <div class="experience-header">
                    <div class="job-title" style="color: ${getColor(this.resumeData.color.textColor, 800)}">${exp.jobTitle}</div>
                    <p class="date-range">${new Date(exp.from).toLocaleDateString("en-US",{month:'short',year:"numeric"})} - ${new Date(exp.To).toLocaleDateString("en-US",{month:'short',year:"numeric"})}</p>
                </div>
                <div class="company-name" style="color: ${getColor(this.resumeData.color.textColor, 700)}">${exp.company}</div>
                <ul class="experience-points">
                    ${exp.points.filter(p => p).map(point => `
                        <li class="experience-point" style="color: ${getColor(this.resumeData.color.textColor, 600)}">${point}</li>
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
                    <strong style="color: ${getColor(this.resumeData.color.textColor, 800)}">${edu.degree}</strong>, 
                    <span style="color: ${getColor(this.resumeData.color.textColor, 600)}">${edu.institution}</span>
                </p>
                <p class="date-range">${new Date(edu.from).toLocaleDateString("en-US",{month:'short',year:"numeric"})} - ${new Date(edu.To).toLocaleDateString("en-US",{month:'short',year:"numeric"})}</p>
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
                    <strong style="color: ${getColor(this.resumeData.color.textColor, 800)}">${cert.title}</strong> - 
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
            border-left: 4px solid;
        }

        .header {
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
        }

        .header h1 {
            font-size: 1.5rem;
            font-weight: bold;
            color: white;
        }

        .header p {
            font-size: 0.75rem;
            margin-top: 0.25rem;
            font-weight: 500;
            color: white;
        }

        .section {
            margin-top: 1rem;
        }

        .section-title {
            font-size: 0.875rem;
            font-weight: bold;
            color: white;
            padding: 0.5rem;
            border-radius: 4px;
            margin-bottom: 0.5rem;
        }

        .section-title.no-background {
            background: none !important;
            color: var(--text-color-700, #374151);
            padding: 0;
        }

        .summary-text {
            font-size: 0.75rem;
            line-height: 1.625;
            background-color: #f9fafb;
            padding: 0.75rem;
            border-radius: 4px;
        }

        .experience-item {
            margin-bottom: 1rem;
            background-color: #f9fafb;
            padding: 0.75rem;
            border-radius: 4px;
        }

        .experience-header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        .job-title {
            font-weight: 600;
            font-size: 0.875rem;
        }

        .date-range {
            color: #6b7280;
            font-size: 0.875rem;
        }

        .company-name {
            font-style: italic;
            font-size: 0.75rem;
            font-weight: 500;
        }

        .experience-points {
            list-style-type: disc;
            list-style-position: inside;
            margin-top: 0.5rem;
            margin-left: 0.5rem;
        }

        .experience-point {
            font-size: 0.75rem;
            margin-bottom: 0.25rem;
        }

        .education-section, .certification-section, .skills-section {
            background-color: #f9fafb;
            padding: 0.75rem;
            border-radius: 4px;
        }

        .education-item-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 0.25rem;
        }

        .education-item {
            font-size: 0.75rem;
        }

        .certification-item-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-top: 0.5rem;
        }

        .certification-item {
            font-size: 0.75rem;
        }

        .skills-group {
            margin-bottom: 0.5rem;
        }

        .skills-label {
            font-size: 0.75rem;
            font-weight: 600;
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

            .education-item-wrapper {
                flex-direction: column;
            }

            .certification-item-wrapper {
                flex-direction: column;
                align-items: flex-start;
            }
        }
    </style>
</head>
<body>
    <div class="resume-container" style="border-color: ${getColor(this.resumeData.color.accentColor, 600)}">
        <header class="header" style="background-color: ${getColor(this.resumeData.color.accentColor, 600)}">
            <h1>${this.resumeData.name}</h1>
            <p>
                ${this.resumeData.email} | ${this.resumeData.phone} | ${this.resumeData.location} | ${this.resumeData.linkedin}
            </p>
        </header>

        ${this.resumeData.summary ? `
        <section class="section">
            <h2 class="section-title" style="background-color: ${getColor(this.resumeData.color.accentColor, 600)}">
                PROFESSIONAL SUMMARY
            </h2>
            <p class="summary-text" style="color: ${getColor(this.resumeData.color.textColor, 600)}">
                ${this.resumeData.summary}
            </p>
        </section>` : ''}

        ${this.resumeData.experiences && this.resumeData.experiences.length > 0 ? `
        <section class="section">
            <h2 class="section-title" style="background-color: ${getColor(this.resumeData.color.accentColor, 600)}">
                WORK EXPERIENCE
            </h2>
            ${this.generateExperienceItems()}
        </section>` : ''}

        ${this.resumeData.education && this.resumeData.education.length > 0 ? `
        <section class="section">
            <h2 class="section-title" style="background-color: ${getColor(this.resumeData.color.accentColor, 600)}">
                EDUCATION
            </h2>
            <div class="education-section">
                ${this.generateEducationItems()}
            </div>
        </section>` : ''}

        ${this.resumeData.certifications && this.resumeData.certifications.length > 0 ? `
        <section class="section">
            <h2 class="section-title" style="background-color: ${getColor(this.resumeData.color.accentColor, 600)}">
                CERTIFICATIONS
            </h2>
            <div class="certification-section">
                ${this.generateCertificationItems()}
            </div>
        </section>` : ''}

        ${this.resumeData.skills ? `
        <section class="section">
            <h2 class="section-title" style="background-color: ${getColor(this.resumeData.color.accentColor, 600)}">
                SKILLS
            </h2>
            <div class="skills-section">
                ${this.resumeData.skills.technical && this.resumeData.skills.technical.length > 0 ? `
                <div class="skills-group">
                    <span class="skills-label" style="color: ${getColor(this.resumeData.color.textColor, 800)}">Technical: </span>
                    <span class="skills-list" style="color: ${getColor(this.resumeData.color.textColor, 600)}">
                        ${this.resumeData.skills.technical.join(", ")}
                    </span>
                </div>` : ''}
                ${this.resumeData.skills.soft && this.resumeData.skills.soft.length > 0 ? `
                <div class="skills-group">
                    <span class="skills-label" style="color: ${getColor(this.resumeData.color.textColor, 800)}">Soft Skills: </span>
                    <span class="skills-list" style="color: ${getColor(this.resumeData.color.textColor, 600)}">
                        ${this.resumeData.skills.soft.join(", ")}
                    </span>
                </div>` : ''}
            </div>
        </section>` : ''}
    </div>
</body>
</html>`;

        return template;
    }

}
export default ModernProfessional