export async function fetchExternalInstructors() {
    const response = await fetch('https://randomuser.me/api/?results=5&inc=name,email,picture');
    if (!response.ok) throw new Error('Erro ao buscar instrutores externos');
    const data = await response.json();
    return data.results;
}
