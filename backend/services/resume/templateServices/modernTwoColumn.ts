import ResumeDataInterface, { TemplateProduct, getColor } from "../../../interfaces/resumeInterface";
class ModernColumn<T extends ResumeDataInterface> implements TemplateProduct {
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
                <div class="experience-content">
                    <div class="job-title">${exp.jobTitle}</div>
                    <div class="experience-header">
                        <div class="company-name">${exp.company}</div>
                        <div class="experience-date">${new Date(exp.from).toLocaleDateString("en-US",{month:'short',year:'numeric'})} - ${new Date(exp.To).toLocaleDateString('en-US',{month:'short',year:'numeric'})}</div>
                    </div>
                    <ul class="experience-points">
                        ${exp.points.filter(p => p).map(point => `
                            <li class="experience-point">
                                <span class="bullet">▪</span>
                                <span>${point}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    }

    private generateEducationItems(): string {
        if (!this.resumeData.education || this.resumeData.education.length === 0) {
            return '';
        }

        return this.resumeData.education.map(edu => `
            <div class="education-item">
                <div class="degree">${edu.degree}</div>
                <div class="institution">${edu.institution}</div>
                <div class="education-dates">
                    <span class="date-from">${new Date(edu.from).toLocaleDateString("en-US",{month:'short',year:'numeric'})}</span>
                    <span class="date-separator">-</span>
                    <span class="date-to">${new Date(edu.To).toLocaleDateString("en-US",{month:'short',year:'numeric'})}</span>
                </div>
            </div>
        `).join('');
    }

    private generateCertificationItems(): string {
        if (!this.resumeData.certifications || this.resumeData.certifications.length === 0) {
            return '';
        }

        return this.resumeData.certifications.map(cert => `
            <div class="certification-item">
                <span class="cert-title">${cert.title}</span> - ${cert.issuer} (${new Date(cert.year).toLocaleDateString("en-US",{month:'short',year:'numeric'})})
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
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            padding: 1.5rem;
            max-height: calc(100vh - 2rem);
            overflow-y: auto;
            border-top: 8px solid #334155;
        }

        .header {
            background-color: #334155;
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1.5rem;
        }

        .header h1 {
            font-size: 1.5rem;
            font-weight: bold;
        }

        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
            margin-top: 0.5rem;
            font-size: 0.75rem;
        }

        .section {
            margin-top: 1.5rem;
        }

        .section-title {
            font-size: 0.875rem;
            font-weight: bold;
            color: #334155;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 0.25rem;
            margin-bottom: 0.75rem;
        }

        .section-title.hidden {
            display: none;
        }

        .summary-text {
            font-size: 0.75rem;
            color: #374151;
            line-height: 1.625;
        }

        .experience-item {
            margin-bottom: 1rem;
        }

        .experience-content {
            background-color: #f8fafc;
            padding: 0.75rem;
            border-radius: 0.25rem;
        }

        .job-title {
            font-weight: bold;
            font-size: 0.875rem;
            color: #1e293b;
        }

        .experience-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .company-name {
            font-size: 0.75rem;
            color: #475569;
            font-weight: 500;
        }

        .experience-date {
            font-size: 0.75rem;
            color: #475569;
            font-weight: 500;
        }

        .experience-points {
            list-style: none;
            margin-top: 0.5rem;
        }

        .experience-point {
            font-size: 0.75rem;
            color: #374151;
            margin-bottom: 0.25rem;
            display: flex;
            align-items: flex-start;
        }

        .bullet {
            color: #64748b;
            margin-right: 0.5rem;
            font-weight: bold;
            flex-shrink: 0;
        }

        .two-column-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-top: 1.5rem;
        }

        .education-item {
            font-size: 0.75rem;
            color: #374151;
            margin-bottom: 0.5rem;
        }

        .degree {
            font-weight: 600;
            color: #1e293b;
        }

        .institution {
            color: #374151;
        }

        .education-dates {
            display: flex;
            gap: 0.5rem;
            color: #475569;
        }

        .skills-group {
            margin-bottom: 0.75rem;
        }

        .skills-label {
            font-size: 0.75rem;
            font-weight: 600;
            color: #1e293b;
            display: block;
            margin-bottom: 0.25rem;
        }

        .skills-list {
            font-size: 0.75rem;
            color: #374151;
        }

        .certification-item {
            font-size: 0.75rem;
            color: #374151;
            margin-bottom: 0.5rem;
        }

        .cert-title {
            font-weight: 600;
            color: #1e293b;
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
            
            .contact-grid {
                grid-template-columns: 1fr;
            }
            
            .two-column-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="resume-container">
        <header class="header">
            <h1>${this.resumeData.name}</h1>
            <div class="contact-grid">
                <div>${this.resumeData.email}</div>
                <div>${this.resumeData.phone}</div>
                <div>${this.resumeData.location}</div>
                <div>${this.resumeData.linkedin}</div>
            </div>
        </header>

        <section class="section">
            <h2 class="section-title ${this.resumeData.summary?"":"hidden"}">
                ${this.resumeData.summary?"PROFESSIONAL SUMMARY":""}
            </h2>
            ${this.resumeData.summary ? `<p class="summary-text">${this.resumeData.summary}</p>` : ''}
        </section>

        <section class="section">
            <h2 class="section-title ${this.resumeData.experiences && this.resumeData.experiences.length>0?"":"hidden"}">
                ${this.resumeData.experiences && this.resumeData.experiences.length>0?'PROFESSIONAL EXPERIENCE':''}
            </h2>
            ${this.generateExperienceItems()}
        </section>

        <div class="two-column-grid">
            <section class="section">
                <h2 class="section-title ${this.resumeData.education && this.resumeData.education.length>0?"":"hidden"}">
                    ${this.resumeData.education && this.resumeData.education.length>0?'EDUCATION':''}
                </h2>
                ${this.generateEducationItems()}
            </section>

            <section class="section">
                <h2 class="section-title ${( this.resumeData.skills && this.resumeData.skills?.technical?.length>0 ||this.resumeData.skills && this.resumeData.skills?.soft?.length>0)?"":"hidden"}">
                    ${(this.resumeData.skills && this.resumeData.skills?.technical?.length>0 ||  this.resumeData.skills && this.resumeData.skills?.soft?.length>0)?'KEY SKILLS':''}
                </h2>
                ${this.resumeData.skills?.technical && this.resumeData.skills.technical.length > 0 ? `
                <div class="skills-group">
                    <span class="skills-label">Technical Skills</span>
                    <div class="skills-list">${this.resumeData.skills.technical.join(", ")}</div>
                </div>` : ''}
                ${this.resumeData.skills?.soft && this.resumeData.skills.soft.length > 0 ? `
                <div class="skills-group">
                    <span class="skills-label">Soft Skills</span>
                    <div class="skills-list">${this.resumeData.skills.soft.join(", ")}</div>
                </div>` : ''}
            </section>
        </div>

        ${this.resumeData.certifications && this.resumeData.certifications.length > 0 ? `
        <section class="section">
            <h2 class="section-title">CERTIFICATIONS</h2>
            <div class="certifications-grid">
                ${this.generateCertificationItems()}
            </div>
        </section>` : ''}
    </div>
</body>
</html>`;

        return template;
    }
}

export default ModernColumn
