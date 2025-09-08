import ResumeDataInterface from "../../../interfaces/resumeInterface"
import { TemplateProduct } from "../../../interfaces/resumeInterface";
import { getColor } from "../../../interfaces/resumeInterface";
class ModernMinimalist <T extends ResumeDataInterface>  implements TemplateProduct {
   
    public resumeData:T
    constructor(resumeData:T){
    this.resumeData=resumeData
    }
   
    private generateExperienceItems(): string  {
        if(this.resumeData.experiences){
          return this.resumeData.experiences.map(exp => `
            <div class="experience-item">
                <div class="experience-header">
                    <div class="job-title" style="color: ${getColor(this.resumeData.color.textColor, 800)}">${exp.jobTitle}</div>
                    <p class="date-range" style="color: ${getColor(this.resumeData.color.textColor, 800)}">(${exp.from.toLocaleDateString("en-US",{month:'short',year:"numeric"})}) - (${exp.To.toLocaleDateString("en-US",{month:'short',year:"numeric"})})</p>
                </div>
                <div class="company-name" style="color: ${getColor(this.resumeData.color.textColor, 600)}">${exp.company}</div>
                <ul class="experience-points">
                        ${exp.points.filter(p => p).map(point => `
                            <li class="experience-point" style="color: ${getColor(this.resumeData.color.textColor, 600)}">${point}</li>
                            `).join('')}
                    </ul>
                </div>
        `).join('');
      }
      return ''
      }

    private generateEducationItems(): string {
        if(Array.isArray(this.resumeData.education)){
            return this.resumeData.education.map(edu => `
                <div class="education-item-wrapper">
                    <p class="education-item" style="color: ${getColor(this.resumeData.color.textColor, 600)}">
                        <strong>${edu.degree}</strong>, ${edu.institution}
                    </p>
                    <p class="date-range" style="color: ${getColor(this.resumeData.color.textColor, 800)}">(${edu.from.toLocaleDateString("en-US",{month:'short',year:"numeric"})}) - (${edu.To.toLocaleDateString("en-US",{month:'short',year:"numeric"})})</p>
                </div>
                `).join('');
                }
                else
            return ''
                
    }

    private generateCertificationItems(): string   {
        if(this.resumeData.certifications){
          return this.resumeData.certifications.map(cert => `
            <div class="certification-item-wrapper">
                <p class="certification-item" style="color: ${getColor(this.resumeData.color.textColor, 600)}">
                    <strong>${cert.title}</strong> - ${cert.issuer}
                </p>
                <p class="date-range" style="color: ${getColor(this.resumeData.color.textColor, 800)}">(${new Date(cert.year).toLocaleDateString("en-US",{month:'short',year:"numeric"})})</p>
            </div>
            `).join('');
            }
            return ''
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

        .header h1 {
            font-size: 1.5rem;
            font-weight: bold;
        }

        .header p {
            font-size: 0.75rem;
            margin-top: 0.25rem;
        }

        .section {
            margin-top: 1rem;
        }

        .section-title {
            font-size: 0.875rem;
            font-weight: bold;
            border-bottom: 2px solid;
            padding-bottom: 0.25rem;
            margin-bottom: 0.5rem;
        }

        .section-title.no-border {
            border-bottom: none;
        }

        .summary-text {
            font-size: 0.75rem;
            line-height: 1.625;
        }

        .experience-item {
            margin-bottom: 0.75rem;
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
            font-size: 0.875rem;
        }

        .company-name {
            font-style: italic;
            font-size: 0.75rem;
        }

        .experience-points {
            list-style-type: disc;
            list-style-position: inside;
            margin-top: 0.25rem;
            margin-left: 0.5rem;
        }

        .experience-point {
            font-size: 0.75rem;
        }

        .education-item-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 0.25rem;
            margin-top: 0.5rem;
        }

        .education-item {
            font-size: 0.75rem;
        }

        .certification-item-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 0.25rem;
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
            }
        }
    </style>
</head>
<body>
    <div class="resume-container">
        <header class="header">
            <h1 style="color: ${getColor(this.resumeData.color.textColor, 800)}">${this.resumeData.name}</h1>
            <p style="color: ${getColor(this.resumeData.color.textColor, 600)}">
                ${this.resumeData.email} | ${this.resumeData.phone} | ${this.resumeData.location} | ${this.resumeData.linkedin}
            </p>
        </header>

        <section class="section ${this.resumeData.summary ? '' : 'hidden'}">
            <h2 class="section-title ${this.resumeData.summary ? '' : 'no-border'}" 
                style="color: ${getColor(this.resumeData.color.textColor, 700)}; border-color: ${getColor(this.resumeData.color.accentColor, 600)}">
                ${this.resumeData.summary ? 'Professional Summary' : ''}
            </h2>
            <p class="summary-text" style="color: ${getColor(this.resumeData.color.textColor, 600)}">${this.resumeData.summary}</p>
        </section>

        <section class="section ${this.resumeData.experiences && this.resumeData.experiences.length > 0 ? '' : 'hidden'}">
            <h2 class="section-title ${this.resumeData.experiences && this.resumeData.experiences.length > 0 ? '' : 'no-border'}" 
                style="color: ${getColor(this.resumeData.color.textColor, 700)}; border-color: ${getColor(this.resumeData.color.accentColor, 600)}">
                ${this.resumeData.experiences && this.resumeData.experiences.length > 0 ? 'Work Experience' : ''}
            </h2>
            ${this.generateExperienceItems()}
        </section>

        <section class="section ${this.resumeData.education.length > 0 ? '' : 'hidden'}">
            <h2 class="section-title ${this.resumeData.education.length > 0 ? '' : 'no-border'}" 
                style="color: ${getColor(this.resumeData.color.textColor, 700)}; border-color: ${getColor(this.resumeData.color.accentColor, 600)}">
                ${this.resumeData.education.length > 0 ? 'Education' : ''}
            </h2>
            ${this.generateEducationItems()}
        </section>

        <section class="section ${this.resumeData.certifications && this.resumeData.certifications.length > 0 ? '' : 'hidden'}">
            <h2 class="section-title ${this.resumeData.certifications && this.resumeData.certifications.length > 0 ? '' : 'no-border'}" 
                style="color: ${getColor(this.resumeData.color.textColor, 700)}; border-color: ${getColor(this.resumeData.color.accentColor, 600)}">
                ${this.resumeData.certifications && this.resumeData.certifications.length > 0 ? 'Certifications' : ''}
            </h2>
            ${this.generateCertificationItems()}
        </section>

        <section class="section ${this.resumeData.skills && (this.resumeData.skills.technical.length > 0 || this.resumeData.skills.soft.length > 0) ? '' : 'hidden'}">
            <h2 class="section-title ${this.resumeData.skills && (this.resumeData.skills.technical.length > 0 || this.resumeData.skills.soft.length > 0 )? '' : 'no-border'}" 
                style="color: ${getColor(this.resumeData.color.textColor, 700)}; border-color: ${getColor(this.resumeData.color.accentColor, 600)}">
                ${this.resumeData.skills && (this.resumeData.skills.technical.length > 0 || this.resumeData.skills.soft.length > 0) ? 'Skills' : ''}
            </h2>
            <div class="skills-group ${this.resumeData.skills && this.resumeData.skills.technical.length > 0 ? '' : 'hidden'}">
                <span class="skills-label" style="color: ${getColor(this.resumeData.color.textColor, 700)}">Technical: </span>
                <span class="skills-list" style="color: ${getColor(this.resumeData.color.textColor, 600)}">
                    ${this.resumeData.skills && this.resumeData.skills.technical.join(", ")}
                </span>
            </div>
            <div class="skills-group ${this.resumeData.skills && this.resumeData.skills.soft.length > 0 ? '' : 'hidden'}">
                <span class="skills-label" style="color: ${getColor(this.resumeData.color.textColor, 700)}">Soft Skills: </span>
                <span class="skills-list" style="color: ${getColor(this.resumeData.color.textColor, 600)}">
                    ${this.resumeData.skills && this.resumeData.skills.soft.join(", ")}
                </span>
            </div>
        </section>
    </div>
</body>
</html>`;

        return template;
    }
}

export default ModernMinimalist