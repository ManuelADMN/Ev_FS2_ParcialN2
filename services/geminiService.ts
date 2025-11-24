
import { Service, TeamMember } from '../types/types';

export const aboutUsText = "Redefinimos el estándar de la ciencia de datos en la industria, no solo procesamos datos, eliminamos el ruido para que nuestros clientes puedan tomar las mejores decisiones.\n\nDesde la optimización crítica en la acuicultura hasta la precisión milimétrica en la industria minera, la tecnología Deep Learning de Denoise transforma la incertidumbre en estrategias claras.\n\nEstamos comprometidos a impulsar un futuro donde la rentabilidad económica y la sostenibilidad ecológica no sean opuestos, sino aliados inseparables.";

export const servicesData: Service[] = [
  {
    title: "Análisis Acuícola con IA",
    description: "Optimizamos la salmonicultura mediante modelos de IA que analizan la biomasa, detectan enfermedades tempranamente y mejoran la alimentación. Aumente su eficiencia y sostenibilidad con datos precisos en tiempo real.",
    icon: "ChartPieIcon",
    projectName: "DenoQ"
  },
  {
    title: "Monitoreo Ambiental Minero",
    description: "Ofrecemos soluciones de IA para evaluar y predecir el impacto ambiental de proyectos mineros. Monitoree la calidad del agua, aire y suelo para garantizar el cumplimiento normativo y una operación responsable.",
    icon: "CircleStackIcon",
    projectName: "DenoM"
  },
  {
    title: "Gestión Sostenible de Recursos",
    description: "Nuestros modelos predictivos le ayudan a gestionar recursos naturales de forma eficiente. Analizamos variables complejas para anticipar cambios y optimizar el uso de recursos, promoviendo un futuro sostenible.",
    icon: "GlobeEuropeAfricaIcon",
    projectName: "DenoR"
  }
];

export const teamMembersData: TeamMember[] = [
  {
    id: 'guillermo-cerda',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
    name: 'Guillermo Cerda',
    title: 'Estratega de Tecnología',
    followers: 420,
    posts: 35,
    bio: 'Lidera la visión técnica de Denoise. 15+ años diseñando sistemas distribuidos y arquitecturas cloud resilientes. Su enfoque combina la robustez de la ingeniería tradicional con la agilidad de los nuevos paradigmas de IA.',
    skills: ['Cloud Architecture', 'IoT Systems', 'Strategic Leadership', 'Kubernetes']
  },
  {
    id: 'manuel-diaz',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
    name: 'Manuel Diaz',
    title: 'Científico de Datos Principal',
    followers: 385,
    posts: 52,
    bio: 'PhD MIT. Especialista en Deep Learning y reconocimiento de patrones biológicos. Manuel transforma el caos de los datos no estructurados en modelos predictivos de alta precisión, liderando la investigación fundamental de Denoise.',
    skills: ['Deep Learning', 'Computer Vision', 'Predictive Modeling', 'Python']
  },
  {
    id: 'diego-aravena',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
    name: 'Diego Aravena',
    title: 'Desarrollador Full Stack Senior',
    followers: 290,
    posts: 28,
    bio: 'Experto en React y visualización de datos con D3.js. Diego es el arquitecto detrás de nuestras interfaces, asegurando que la complejidad de los datos procesados se traduzca en una experiencia de usuario intuitiva y fluida.',
    skills: ['React', 'D3.js', 'UX/UI Design', 'Node.js']
  }
];
